var path           = require('path')
var BridgesExpress = require('bridges-express')
var port           = process.env.PORT || 5000
var models         = require(__dirname+'/../models');

module.exports = new BridgesExpress({
	directory: path.join(__dirname, '..'),
	controllers: {
      inject: [models]
    }
})



