'use strict';

var contactListServices = angular.module('contactList.services', []);


contactListServices.factory('contactService', function($http) {
  return {
    getContacts: function () {
        return $http.get('/contactList')
        				.then(function(result) {
	                        return result.data;
                        });
    },

    createContact: function (contact, editing) {
        return $http.post('/contactList/' + contact.location + '/' + contact.name, {contact:contact, editing: editing});
    },

    deleteContact: function (contact) {
        return $http.delete('/contactList/' + contact.location + '/' + contact.name);
    }
  };
});

contactListServices.factory('locationService', function($http) {
  return {
    getLocations: function () {
        return $http.get('/contactList')
                        .then(function(result) {
                            return result.data;
                        });
    },
    createLocation: function (location) {
        return $http.post('/location/' + location);
    },

    deleteLocation: function (contact) {
        return $http.delete('/contactList/' + location.name);
    }
  };
});