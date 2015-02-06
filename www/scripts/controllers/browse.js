'use strict';

app.controller('BrowseController', function ($scope, $routeParams, toaster, Auth, Task, Comment){
	
	$scope.searchTask = '';
	$scope.tasks = Task.all;
	$scope.signedIn = Auth.signedIn;
	$scope.listMode = true;
	$scope.user = Auth.user;
	$scope.urlImage = "https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/10246651_10205579279544988_486195867833855232_n.jpg?oh=85fd8ba5d8637294ec4879dad0dd0003&oe=5567F961&__gda__=1432892394_9770ac541e0f2f295e3563a52c9c7797";

	if ($routeParams.taskId) {
		var task = Task.getTask($routeParams.taskId).$asObject();
		$scope.listMode = false;
		setSelectedTask(task);
	}

	function setSelectedTask (task) {
		$scope.selectedTask = task;

		if ($scope.signedIn()) {
			$scope.isTaskCreator = Task.isCreator;
			$scope.isOpen = Task.isOpen;
		}

		$scope.comments  = Comment.comments(task.$id);
	}

	$scope.cancelTask = function (taskId) {
		Task.cancelTask(taskId).then(function() {
			toaster.pop('success','This task has been canceled succesfully.');
		});
	};

	$scope.addComment = function () {
		var comment = {
			content: $scope.content,
			name: $scope.user.profile.name
		};
		Comment.addComment($scope.selectedTask.$id, comment).then(function() {
			$scope.content = '';
			toaster.pop('success','Comment added succesfully.');
		},function(err) {
			toaster.pop('error','Oops! something went wrong.');
		})
	};

});