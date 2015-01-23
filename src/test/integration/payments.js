var app = require(__dirname+'/../../lib/server')
var assert = require('assert')
var http = require('supertest')(app)
var uuid = require('uuid')

describe('Fidor Sync API end points', function() {

  it('should create a payment when required params are passed', function(done) {
    var uid = uuid.v4();

    http.post('/payments')
    .send({
      amount: 1,
      iban: 'DE72965563127674898541',
      uid: uid
    })
    .end(function(error, response) {
      if(error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 200);
      done();
    })
  });

  it('should create a payment when uid (required) is not passed since we create one in fidor_client', function(done) {
    http.post('/payments')
    .send({
      amount: 1,
      iban: 'DE72965563127674898541'
    })
    .end(function(error, response) {
      if(error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 200);
      done();
    })
  });

  it('should not create a payment when invalid amount is passed', function(done) {
    http.post('/payments')
    .send({
      amount: 'invalid',
      iban: 'DE72965563127674898541'
    })
    .end(function(error, response) {
      if (error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 400);
      done();
    })
  });

  it('should not create a payment when an amount less than 0.01 is passed', function(done) {
    http.post('/payments')
    .send({
      amount: 0.001,
      iban: 'DE72965563127674898541'
    })
    .end(function(error, response) {
      if (error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 400);
      done();
    })
  });

  it.skip('should not create a payment when invalid iban number is passed', function(done) {
    http.post('/payments')
    .send({
      amount: 1,
      iban: 'invalid'
    })
    .end(function(error, response) {
      if (error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 400)
      done();
    })
  });

  it('should not create a payment when recipient name is a string whose length is greater than 70 chars', function(done) {
    http.post('/payments')
    .send({
      amount: 1,
      iban: 'DE72965563127674898541',
      recipient: 'abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopq'
    })
    .end(function(error, response) {
      if (error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 400)
      done();
    })
  });

  it('should not create a payment when message is a string whose length is greater than 140 chars', function(done) {
    http.post('/payments')
    .send({
      amount: 1,
      iban: 'DE72965563127674898541',
      message: 'abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz'
    })
    .end(function(error, response) {
      if (error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 400)
      done();
    })
  });
});