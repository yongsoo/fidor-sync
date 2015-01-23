var FidorClient = require(__dirname+'/../../lib/fidor_client')
var assert = require('assert')
var uuid = require('uuid')

describe('Fidor Client', function() {
  var fidorClient;

  it('should initialize with Fidor credentials', function() {
    fidorClient = new FidorClient({
      url: process.env['FIDOR_URL'],
      accessToken: process.env['FIDOR_ACCESS_TOKEN'],
      accountId: process.env['FIDOR_ACCOUNT_ID']
    })
  });

  it('should be able to send payment', function(done) {
    var uid = uuid.v4();

    fidorClient.sendPayment({
      amount: 1,
      iban: 'DE72965563127674898541',
      recipient: 'Yong-Soo',
      uid: uid,
      message: 'Test message'
    })
    .then(function(payment) {
      assert.strictEqual(payment.state, 'received');
      assert.strictEqual(payment.remote_name, 'Yong-Soo');
      assert.strictEqual(payment.external_uid, uid);
      assert.strictEqual(payment.subject, 'Test message');
      done();
    })
    .error(function(error) {
      console.log('Error: ', error);
      assert(!error);
      done();
    })
  });

  it('should be denied access with invalid credentials', function(done) {
    fidorClient = new FidorClient({
      url: process.env['FIDOR_URL'],
      accessToken: 'invalid',
      accountId: process.env['FIDOR_ACCOUNT_ID'],
      clientId: process.env['FIDOR_CLIENT_ID'],
      clientSecret: process.env['FIDOR_CLIENT_SECRET']
    })

    fidorClient.sendPayment({
      amount: 1,
      iban: 'DE72965563127674898541',
      recipient: 'Yong-Soo'
    })
    .error(function(error) {
      assert.strictEqual(error.code, 403);
      done();
    })
  });

  it.skip('should be able to get a payment', function() {
    fidorClient.getPayment({

    })
  });


});