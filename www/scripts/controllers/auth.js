'use strict';

app.controller('AuthController', function ($scope, $location,$firebase, FURL, Auth, toaster) {

	if (Auth.signedIn()){
		$location.path('/');
	}

	var ref = new Firebase(FURL);
	var fbTasks = $firebase(ref.child('tasks')).$asArray();

	$scope.register = function (user) {
		Auth.register(user).then(function() {
			toaster.pop('success',"Succesfully registered.");
			$location.path("/")
		},function(err) {
			toaster.pop('error',"Ooops! Something went wrong.");
		});
	};

	$scope.login = function (user) {
		Auth.login(user).then(function() {
			toaster.pop('success',"Succesfully logged in.");
			$location.path("/")
		},function(err) {
			toaster.pop('error',"Ooops! Something went wrong.");
		});
	};	

	$scope.changePassword = function (user) {
		Auth.changePassword(user)
			.then(function() {
			//Reset form
			$scope.user.email = '';
			$scope.user.oldPass = '';
			$scope.user.newPass = '';
			toaster.pop('success',"Password changed succesfully.");

		},function(err) {
			toaster.pop('error',"Ooops! Something went wrong.");
		})
	};	


});