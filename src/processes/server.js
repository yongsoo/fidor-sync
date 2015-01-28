
var path           = require('path')
var BridgesExpress = require('bridges-express')
var port           = process.env.PORT || 5000
var server         = require(__dirname+'/../lib/server')

module.exports = function() {
  server.listen(port, function() {
    console.log('listening on port', port)
  })
}