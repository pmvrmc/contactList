'use strict';

/* Controllers */

angular.module('contactList')
.controller('ContactsCtrl', ['$scope', 'contactList', 'ngDialog', 'contactService', function($scope, contactList, ngDialog, contactService) {

  $scope.contactList = contactList;
    

  $scope.createContact = function(){
    ngDialog.open({
      templateUrl: '../public/views/createContact.html',
      controller: 'CreateContactCtrl',
      scope: $scope,
      className: 'ngdialog ngdialog-theme-default'
    });
  }

  $scope.deleteContact = function(contact){
  	contactService.deleteContact(contact);
  	contactList.splice(contactList.indexOf(contact), 1);
  }

}]);
