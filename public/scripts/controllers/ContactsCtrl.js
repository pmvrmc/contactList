'use strict';

/* Controllers */

angular.module('contactList')
.controller('ContactsCtrl', ['$scope', 'contactList', function($scope, contactList) {

  $scope.contactList = contactList;
    
}]);
