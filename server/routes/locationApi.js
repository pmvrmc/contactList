var Location = require('../models/location.js');

var register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/locations',
    handler: function(request, reply){
      Location.find(function (err, result) {
        if(err) throw err;
        reply(result).code(200).header('message', 'locations returned successfully');
      });
    }
  });

  plugin.route({
    method: 'GET',
    path: '/locations/{id}',
    handler: function(request, reply){
      Location.findById(request.params.id, function (err, result) {
        if(err) throw err;
        reply(user).code(200).header('message', 'location returned successfully');
      });
    }
  });

  plugin.route({
    method: 'POST',
    path: '/locations/{id}',
    handler: function(request, reply){
      var query = {id : request.payload.id}; 
      var options = {upsert: true};
      Location.findOneAndUpdate(query, request.payload, options, function(err, result){
         if(err) throw err;
          reply().code(201).header('message', 'location upserted successfully');
      });
    }
  });

  plugin.route({
    method: 'DELETE',
    path: '/locations/{id}',
    handler: function(request, reply){
      var query = {_id : request.params.id};
      Location.remove(query, function (err) {
        if(err) throw err;
        reply().code(204).header('message', 'location deleted successfully');
      });
    }
  });


  next();
};


register.attributes = {
  name : 'locationApi',
  version : '0.0.1'
}

module.exports = register;
