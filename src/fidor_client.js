
var Promise = require('bluebird')
var http = require('superagent')
var IBAN = require('iban')

var FidorClient = function(options) {
  this.url = options.url;
  this.accessToken = options.accessToken;
  this.accountId = options.accountId;
}

FidorClient.prototype.sendPayment = function(options) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    if (!IBAN.isValid(options.iban)) {
      return reject(new Error('IBAN must be valid'));
    }

    var payment = {
      amount: Math.floor(options.amount * 100),
      external_uid: options.uid,
      account_id: _this.accountId,
      remote_name: options.recipient,
      remote_iban: options.iban,
      subject: options.message
    };

    http
      .post(_this.url + '/sepa_credit_transfers')
      .type('application/json')
      .accept('application/vnd.fidor.de; version=1,text/json')
      .set('X-Fidor-Api-Token', _this.accessToken)
      .send(payment)
      .end(function(error, response) {
        if (error) {
          return reject(error);
        }
        if (response.body.error) {
          return reject(response.body.error);
        }
        resolve(response.body);
      });
  });
}

FidorClient.prototype.getPayment = function(id) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    return http
      .get(_this.url + '/sepa_credit_transfers/' + id)
      .type('application/json')
      .accept('application/vnd.fidor.de; version=1,text/json')
      .set('X-Fidor-Api-Token', _this.accessToken)
      .query({ access_token: _this.accessToken })
      .end(function(error, response) {
        if (error) {
          return reject(error);
        }
        resolve(response.body);
      });
  });
}

FidorClient.prototype.getPayments = function(lastId) {
  
}

module.exports = FidorClient;