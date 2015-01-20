
var knex = require('knex')({
  client: process.env['DATABASE_DIALECT'],
  connection: {
    host     : process.env['DATABASE_HOST'],
    user     : process.env['DATABASE_USER'],
    password : process.env['DATABASE_PASSWORD'],
    database : process.env['DATABASE_NAME'],
    charset  : 'utf8'
  }
});

module.exports = knex;