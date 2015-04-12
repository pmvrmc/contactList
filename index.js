'use strict';

var Hapi = require('hapi');
var config = require('getconfig');
var hapiMongooseDbConnector = require('hapi-mongoose-db-connector');

var contactApi = require('./server/routes/contactApi');
var locationApi = require('./server/routes/locationApi');
var defaultApi = require('./server/routes/defaultApi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: process.env.PORT || config.http.port
});


//Register DBC
server.register({
  register : hapiMongooseDbConnector,
  options : {
    mongodbUrl : 'mongodb://' + config.db.user + ':' + config.db.pwd + '@' + config.db.url
  },
}, function (err) {
  if(err) throw err;
});


server.views({
	engines: { html: require('swig') },
	path: './server/views'
});

//Register the API
server.register([contactApi, locationApi, defaultApi], function (err) {});

// Start the server
server.start(function (err) {
  if(err) {
    log.warn(err);
    throw err;
  }
  console.log('Server started at: ' + server.info.uri);
});


module.exports = server;