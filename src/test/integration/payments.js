var app = require(__dirname+'/../../lib/server');
var assert = require('assert');
var http = require('supertest')(app);
var uuid = require('uuid');

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
});