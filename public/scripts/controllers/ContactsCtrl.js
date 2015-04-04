'use strict';

/* Controllers */

angular.module('contactList')
.controller('ContactsCtrl', ['$scope', 'contactList', 'ngDialog', function($scope, contactList, ngDialog) {

  $scope.contactList = contactList;
    

  $scope.createContact = function(){
    ngDialog.open({
      templateUrl: '../public/views/createContact.html',
      controller: 'CreateContactCtrl',
      className: 'ngdialog ngdialog-theme-default'
    });
  }

}]);
