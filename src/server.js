
var FidorClient = require(__dirname+'/fidor_client')
var GatewayClient = require(__dirname+'/gateway_client')
var config = require(__dirname+'/config')
var Promise = require('bluebird')
var promiseWhile = require('promise-while')(Promise)

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
promiseWhile(
	function() {
	return true;	
},
  function() {
    return new Promise(function(resolve, reject) {
      gatewayClient.getNextTransaction()
        .then(function(payment) {
          if (payment) {
            return fidorClient.sendPayment({
              amount    : payment.source_amount,
              uid       : payment.id,
              recipient : payment.toAccount.name,
              iban      : payment.toAccount.address,
              subject   : payment.memos
            })
            .then(function(response) {
              if (response.state === 'received') {
                return gatewayClient.updateTransactionStatus(payment.id, 'cleared').then(resolve);
              } else {
                console.error('FidorError:', response);
                setTimeout(resolve, 1000);
              }
            })
          } else {
            setTimeout(resolve, 1000)
          }
        })
        .error(function(error) {
          console.error('Error:', error);
          setTimeout(resolve, 1000);
        });
      });
  }
)


// Monitor FIDOR for new transactions - INBOUND