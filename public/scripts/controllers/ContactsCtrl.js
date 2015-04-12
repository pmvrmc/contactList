'use strict';

/* Controllers */

angular.module('contactList')
.controller('ContactsCtrl', ['$scope', 'rawContactList', 'ngDialog', 'contactService', function($scope, rawContactList, ngDialog, contactService) {

  $scope.CL = rawContactList;

  $scope.contactList = [];

  $scope.CL.forEach(function(location){
    location.contacts.forEach(function(contact){
      var newContact = contact;
      newContact.location = location.name;
      $scope.contactList.push(newContact);
    });
  });

  $scope.createContact = function(contact, editing){
    ngDialog.open({
      templateUrl: '../public/views/createContact.html',
      controller: 'CreateContactCtrl',
      scope: $scope,
      className: 'ngdialog ngdialog-theme-default',
      data: {contact: contact, editing:editing}
    });
  }

  $scope.deleteContact = function(contact){
  	contactService.deleteContact(contact);
  	$scope.contactList.splice($scope.contactList.indexOf(contact), 1);
  }

}]);
