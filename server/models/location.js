var mongoose = require('mongoose');
var Contact = require('./contact.js');

var locationSchema = new mongoose.Schema({
  name: String,
  contacts : [Contact.schema]
});

var Location = mongoose.model('Location', locationSchema, 'locations');

module.exports = Location;