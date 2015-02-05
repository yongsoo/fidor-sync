
var FidorClient = require('fidor_client')
var GatewayClient = require('gateway_client')
var config = require('config')

var fidorClient = new FidorClient({
	url: config.get('FIDOR_URL'),
	accessToken: config.get('FIDOR_ACCESS_TOKEN'),
	accountId: config.get('FIDOR_ACCOUNT_ID'),
  clientId: config.get('FIDOR_CLIENT_ID'),
  clientSecret: config.get('FIDOR_CLIENT_SECRET')
})

var gatewayClient = new GatewayClient({
  url: config.get('EUR_GATEWAY_URL'),
  username: config.get('EUR_GATEWAY_USERNAME'),
  password: config.get('EUR_GATEWAY_PASSWORD')
})

// Monitor gatewayd EUR for new transactions - OUTBOUND
setInterval(function() {
	gatewayClient.getTransactions()
	  .then(function(response) {
			var txs = response.external_transactions;
			if (txs.length !== 0) {
				for (var i = 0; i < txs.length; i++) {
					fidorClient.sendPayment({
						amount: txs[i].source_amount,
						uid: txs[i].id,
						recipient: txs[i].toAccount.name,
						iban: txs[i].toAccount.uid,
						subject: txs[i].memos
					})
					.then(function(response) {
						if (response.state === 'received') {
							gatewayClient.updateTransactionStatus(response.state.TX_ID_HERE, 'cleared');
						} else {
							// TODO: FIDOR payment failed... handle errors, maybe do nothing since this will loop again
						}
					})
				}
			}
		})
}, 100)


// Monitor FIDOR for new transactions - INBOUND