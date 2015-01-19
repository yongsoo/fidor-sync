var Application = require('bridges-application')
var path        = require('path')
var models      = require(path.join(__dirname, 'models'))
var lib         = require(path.join(__dirname, 'lib'))

var application = new Application({
  directory : __dirname,
  processes : {
    inject: [models, lib]
  }
})

application.supervisor.start()

