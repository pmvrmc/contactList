'use strict';

/* Controllers */

angular.module('contactList')
.controller('CreateContactCtrl', ['$scope', 'contactService', 
  function($scope, contactService) {

    $scope.submit = function(contact){
    	contactService.createContact(contact);
    	$scope.$parent.contactList.push(contact);
    	$scope.closeThisDialog(	);
    }
}]);
