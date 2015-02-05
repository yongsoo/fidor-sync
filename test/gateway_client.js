
var GatewayClient = require('./../src/gateway_client')
var assert = require('assert')
var config = require('./../src/config')
var uuid = require('uuid') 

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

  it.skip('should be able to create a transaction', function(done) {
    var uuidNum = uuid.v4();
    var transaction = {
      deposit: false,
      external_account_id: 12,
      source_amount: 2,
      source_currency: 'EUR',
      destination_amount: 2,
      destination_currency: 'EUR',
      status: 'invoiced',
      ripple_transaction_id: 234,
      uid: uuidNum,
      invoice_id: '84cfb783192e9e563bf8e3b0ac31d9403a185e5af5f5a441db855dcc4a8a171a'
    };

    gatewayClient.createExternalTransaction(transaction)
      .then(function(response) {
        assert.strictEqual(response.success, true);
        assert.strictEqual(response.externalTransaction.uid, uuidNum);
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
      uid: uuid.v4(),
      user_id: 1,
      invoice_id: '84cfb783192e9e563bf8e3b0ac31d9403a185e5af5f5a441db855dcc4a8a171a'
    };

    gatewayClient.createExternalTransaction(transaction)
      .then(function(transactions) {
        gatewayClient.updateTransactionStatus(transactions.externalTransaction.id, 'cleared')
          .then(function(response) {
            assert.strictEqual(response.externalTransaction.status, 'cleared');
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

  it.skip('should be able to create an external account', function(done) {
    var uuidNum = uuid.v4();
    var externalAcct = {
      address: 'DE72965563127474898541',
      name: 'Yong-Soo',
      user_id: 1,
      uid: '111',
      type: 'iban',
      data: 'Bank of Yong-Soo'
    };

    gatewayClient.createExternalAccount(externalAcct)
      .then(function(response) {
        assert.strictEqual(response.success, true);
        done();
      })
      .error(function(error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      })
  });


});