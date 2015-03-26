var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  name: String,
  address: String,
  birthDate: Date,
  location: String,
  telephone: Number,
  email: String,
});

var Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;
