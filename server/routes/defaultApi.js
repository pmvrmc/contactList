var register = function (plugin, options, next) {

  plugin.route({
    method: 'GET',
    path: '/',
    config: {
      handler: function(request, reply){            
        reply.view('index');          
      }
    }
  });

  plugin.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  plugin.route({
    method: 'GET',
    path: '/bower_components/{param*}',
    handler: {
      directory: {
        path: 'bower_components'
      }
    }
  });

  next();
};


register.attributes = {
    name : 'defaultApi',
    version : '0.0.1'
}

module.exports = register;
