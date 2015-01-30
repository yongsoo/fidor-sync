
var GatewayClient = require('./../src/gateway_client')
var assert = require('assert')
var config = require('./../src/config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('Gateway Client', function() {
  var gatwayClient;

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
});