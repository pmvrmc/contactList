var Contact = require('../models/contact.js');
var Location = require('../models/location.js');

var register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/contactList/{locationId}/{contactId}',
    handler: function(request, reply){
      var query = {'name' : request.params.locationId, 'contact.name' : request.params.contactId}
      Location.find(query, function(err, result){
        if(err) throw err;
        reply(user).code(200).header('message', 'contact returned successfully');
      });
    }
  });

  plugin.route({
    method: 'POST',
    path: '/contactList/{locationId}/{contactId}',
    handler: function(request, reply){
      var query = {'name' : request.params.locationId}
      var options = {upsert: true};

      console.log(JSON.stringify(request.payload));
      if(request.payload.editing){
        var query = {'name' : request.payload.contact.location};
        var options = {upsert: true};
        Location.findOneAndUpdate(query, options, function (err, location) {
          if(err) throw err;

          if(!location){
            location = new Location();
            location.name = request.params.locationId;
          }
          var contact = location.contacts.filter(function (contact) {
            return contact.name === request.payload.contact.name;
          }).pop();

          location.contacts.splice(location.contacts.indexOf(contact), 1);

          location.save(function (err){
            if(err) throw err;
            console.log('removed contact from ' + request.payload.contact.location);
          });
        }); 
      }


      Location.findOneAndUpdate(query, options, function(err, location){
        if(err) throw err;
        if(!location){
          location = new Location();
          location.name = request.params.locationId;
        }
        var contact = location.contacts.filter(function (contact) {
          return contact.name === request.params.contactId;
        }).pop();

        if(contact){
          location.contacts.splice(location.contacts.indexOf(contact), 1); 
        }


        var newContact = new Contact();
        newContact.name = request.payload.contact.name;
        newContact.address = request.payload.contact.address;
        newContact.birthDate = request.payload.contact.birthDate;
        newContact.telephone = request.payload.contact.telephone;
        newContact.email = request.payload.contact.email;
        location.contacts.push(newContact);

        location.save(function (err){
          if(err) throw err;
          console.log('updated contact from ' + request.params.locationId);
          reply().code(201).header('message', 'contact upserted successfully');
        });
      });

      
    }
  });

  plugin.route({
    method: 'DELETE',
    path: '/contactList/{locationId}/{contactId}',
    handler: function(request, reply){
      var query = {'name' : request.params.locationId}
      var options = {upsert: true};
      Location.findOneAndUpdate(query, options, function (err, location) {
        if(err) throw err;

        if(!location){
          location = new Location();
          location.name = request.params.locationId;
        }
        var contact = location.contacts.filter(function (contact) {
          return contact.name === request.params.contactId;
        }).pop();

        location.contacts.splice(location.contacts.indexOf(contact), 1);

        location.save(function (err){
          if(err) throw err;
          reply().code(204).header('message', 'contact deleted successfully');
        });
      });
    }
  });


  next();
};


register.attributes = {
  name : 'contactApi',
  version : '0.0.1'
}

module.exports = register;
