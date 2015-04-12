'use strict';

/* Controllers */

angular.module('contactList')
.controller('CreateContactCtrl', ['$scope', 'contactService', 'locationService', 'ngDialog',
  function($scope, contactService, locationService, ngDialog) {

  	$scope.contact = $scope.ngDialogData.contact;
    $scope.editing = $scope.ngDialogData.editing;

  	$scope.selectedLocation = $scope.CL.filter(function(location){
  		return $scope.contact && location.name === $scope.contact.location;
  	});
  	$scope.selectedLocation = $scope.selectedLocation[0];
    
    $scope.submit = function(contact){
    	contact.location = $scope.selectedLocation.name;
    	contactService.createContact(contact, $scope.editing);

      if($scope.editing){
    	 $scope.$parent.contactList.splice($scope.$parent.contactList.indexOf(contact), 1);
      }
    	$scope.$parent.contactList.push(contact);

    	$scope.closeThisDialog();
    };

    $scope.addLocation = function(location){
    	locationService.createLocation(location);
    	$scope.CL.push({name: location, contacts:[]});
    	$scope.closeThisDialog();
    };

    $scope.createLocation = function(){
    	ngDialog.open({
	    	templateUrl: '../public/views/createLocation.html',
	      	controller: 'CreateContactCtrl',
	      	scope: $scope,
	      	className: 'ngdialog ngdialog-theme-default'
    	});
    }
}]);
