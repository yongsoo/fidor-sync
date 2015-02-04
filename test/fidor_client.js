
var FidorClient = require('./../src/fidor_client')
var uuid = require('uuid')
var assert = require('assert')
var config = require('./../src/config')

describe('Fidor Client', function() {
  var fidorClient;

  it('should initialize with Fidor credentials', function() {
    fidorClient = new FidorClient({
      url: config.get('FIDOR_URL'),
      accessToken: config.get('FIDOR_ACCESS_TOKEN'),
      accountId: config.get('FIDOR_ACCOUNT_ID')
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

  it('should not be able to send payment with invalid IBAN', function(done) {
    var uid = uuid.v4();

    fidorClient.sendPayment({
      amount: 1,
      iban: 'invalid',
      recipient: 'Yong-Soo',
      uid: uid,
      message: 'Test message'
    })
    .error(function(error) {
      console.log('Error: ', error);
      assert.strictEqual(error instanceof Error, true);
      assert.strictEqual(error.message, 'IBAN must be valid');
      done();
    })
  });

  it('should be able to get a payment', function(done) {
    fidorClient.getPayment(5777)
    .then(function(payment) {
      assert.strictEqual(payment.id, '5777');
      done();
    })
    .error(function(error) {
      console.log('Error: ', error);
      assert(!error);
      done();
    })
  });

  it('should be not be able to get a payment with invalid id', function(done) {
    fidorClient.getPayment(235781290794026029045024690289046223523525235235235235252062)
    .then(function(payment) {
      assert.strictEqual(payment.error.code, 404);
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
      url: config.get('FIDOR_URL'),
      accessToken: 'invalid',
      accountId: config.get('FIDOR_ACCOUNT_ID'),
      clientId: config.get('FIDOR_CLIENT_ID'),
      clientSecret: config.get('FIDOR_CLIENT_SECRET')
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
});