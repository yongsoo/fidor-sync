
var Promise = require('bluebird')
var http = require('superagent')

var FidorClient = function(options) {
  this.url = options.url;
  this.accessToken = options.accessToken;
  this.accountId = options.accountId;
}

FidorClient.prototype.sendPayment = function(options) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    var payment = {
      amount: options.amount,
      external_uid: options.uid,
      account_id: _this.accountId,
      access_token: _this.accessToken,
      remote_name: options.recipient,
      remote_iban: options.iban,
      remote_bic: options.bic,
      subject: options.message
    };

    http
      .post(_this.url + '/sepa_credit_transfers')
      .set('Content-Type', 'application/json')
      .send(payment)
      .end(function(error, response) {
        if (error) {
          return reject(error);
        } else {
          if (response.body.error) {
            return reject(response.body.error);
          }
          resolve(response.body);
        }
      });
  });
}

FidorClient.prototype.getPayment = function(id) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    return http
      .get(_this.url + '/sepa_credit_transfers/' + id)
      .query({ access_token: _this.accessToken })
      .end(function(error, response) {
        if (error) {
          return reject(error);
        } else {
          resolve(response.body);
        }
      });
  });
}

FidorClient.prototype.getPayments = function(lastId) {
  
}

module.exports = FidorClient;