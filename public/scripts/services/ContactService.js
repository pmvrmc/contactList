'use strict';

var contactListServices = angular.module('contactList.services', []);


contactListServices.factory('contactService', function($http) {
  return {
    getContacts: function () {
        return $http.get('/contacts')
        				.then(function(result) {
	                        return result.data;
                        });
    },

    createContact: function (contact) {
        return $http.post('/contacts/' + contact.name);
    }
  };
});