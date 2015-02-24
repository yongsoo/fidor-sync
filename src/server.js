
var FidorClient = require(__dirname+'/fidor_client')
var config = require(__dirname+'/config')
var GatewayClient = require('gateway-client')
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
      console.log('Listening for new transactions on gatewayd...');
      gatewayClient.getNextTransaction()
        .then(function(payment) {
          if (payment) {
            console.log('Payment detected. Attemping to send payment to Fidor with payment object:', payment);
            return fidorClient.sendPayment({
              amount     : payment.source_amount,
              uid        : payment.id,
              recipient  : payment.toAccount.name,
              iban       : payment.toAccount.address,
              subject    : payment.memos
            })
            .then(function(response) {
              console.log('Response from Fidor: ', response);
              if (response.state === 'success') {
                console.log('Payment successfully sent, setting gatewayd transaction status to cleared for gatewayd id:', payment.id);
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