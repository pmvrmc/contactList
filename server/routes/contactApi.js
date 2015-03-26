var Contact = require('../models/contact.js');

var register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/contacts',
    handler: function(request, reply){
      Contact.find(function (err, result) {
        if(err) throw err;
        reply(result).code(200).header('message', 'contacts returned successfully');
      });
    }
  });

  plugin.route({
    method: 'GET',
    path: '/contacts/{id}',
    handler: function(request, reply){
      Contact.findById(request.params.id, function (err, result) {
        if(err) throw err;
        reply(user).code(200).header('message', 'contact returned successfully');
      });
    }
  });

  plugin.route({
    method: 'POST',
    path: '/contacts/{id}',
    handler: function(request, reply){
      var query = {id : request.payload.id}; 
      var options = {upsert: true};
      Contact.findOneAndUpdate(query, request.payload, options, function(err, result){
         if(err) throw err;
          reply().code(201).header('message', 'contact upserted successfully');
      });
    }
  });

  plugin.route({
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: function(request, reply){
      var query = {_id : request.params.id};
      Contact.remove(query, function (err) {
        if(err) throw err;
        reply().code(204).header('message', 'contact deleted successfully');
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
