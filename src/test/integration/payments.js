
var app = require(__dirname+'/../../lib/server')
var http = require('supertest')(app)
var uuid = require('uuid')
var assert = require('chai').assert

describe('Fidor Sync API end point: POST /payments', function() {

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

describe('Fidor Sync API end point: GET /payments/:id', function() {

  it('should get a payment when passed in a valid id', function(done) {
    http.get('/payments/5777')
    .end(function(error, response) {
      if(error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.body.success, true);
      assert.strictEqual(response.body.payment.id, '5777');
      done();
    })
  });

  it('should not get a payment when passed in an invalid id', function(done) {
    http.get('/payments/243562346234623463673673673467346')
    .end(function(error, response) {
      if(error) {
        console.log('Error: ', error);
        assert(!error);
        done();
      }
      assert.strictEqual(response.body.success, false);
      assert.strictEqual(response.status, 404);
      done();
    })
  });  

});