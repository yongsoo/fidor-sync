
var knex      = require(__dirname+'/../config/database')
var bookshelf = require('bookshelf')(knex)

module.exports = {
  Notification: require(__dirname+'/notification')(bookshelf),
  Payment: require(__dirname+'/payment')(bookshelf),
  Quote: require(__dirname+'/quote')(bookshelf)
}