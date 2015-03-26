var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
  name: String
});

var Location = mongoose.model('Location', locationSchema, 'locations');

module.exports = Location;