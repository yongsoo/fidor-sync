
var GatewayClient = require('./../src/gateway_client')
var assert = require('assert')
var config = require('./../src/config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('Gateway Client', function() {
  var gatewayClient;

  it('should initialize with gateway credentials', function() {
    gatewayClient = new GatewayClient({
      url: config.get('EUR_GATEWAY_URL'),
      username: config.get('EUR_GATEWAY_USERNAME'),
      password: config.get('EUR_GATEWAY_PASSWORD')
    })
  });

  it('should be able to get external payments', function(done) {
    gatewayClient.getTransactions()
    .then(function(payments) {
      assert.strictEqual(typeof payments, 'object');
      done();
    })
    .error(function(error) {
      console.log('Error: ', error);
      assert(!error);
      done();
    })
  });

  it('should be able to update transaction status to cleared', function(done) {
    var transaction = {
      deposit: false,
      external_account_id: 12,
      source_amount: 2,
      source_currency: 'EUR',
      destination_amount: 2,
      destination_currency: 'EUR',
      status: 'invoiced',
      ripple_transaction_id: 234,
      uid: 2,
      invoice_id: '84cfb783192e9e563bf8e3b0ac31d9403a185e5af5f5a441db855dcc4a8a171a'
    };

    gatewayClient.createExternalTransaction(transaction)
    .then(function(response) {
    })
    .then(function(transactions) {
      gatewayClient.updateTransactionStatusToCleared(transactions.externalTransaction.id)
      .then(function(response) {
        assert.strictEqual(response.status, 'cleared');
        done();
      })
      .error(function(error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      })
    })
    .catch(function(error) {
      console.log('Error: ', error);
      assert(!error);
      done();
    })
  });
});