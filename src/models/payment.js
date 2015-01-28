
var Promise = require('bluebird');

module.exports = function(bookshelf) {

  return bookshelf.Model.extend({
    tableName: 'payments'
  })
}