'use strict';


// Declare app level module which depends on filters, and services
angular.module('contactList', [
    'ngRoute',
    'ngDialog',
    'contactList.services'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: '../public/views/contacts.html',
    controller: 'ContactsCtrl',
      resolve: {
        contactList: function (contactService) {
          return contactService.getContacts();
        }
      }
  });

}]);