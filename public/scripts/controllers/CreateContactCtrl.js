'use strict';

/* Controllers */

angular.module('contactList')
.controller('CreateContactCtrl', ['$scope', 'contactService', 
  function($scope, contactService) {
    $scope.submit = function(contact){
    	contactService.createContact(contact);
    }
}]);
