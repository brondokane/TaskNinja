'use strict';

app.controller('TaskController', function ($scope,FURL, $firebase,$location,$stateParams,toaster) {

	var ref = new Firebase(FURL)
	var fbTasks = $firebase(ref.child('tasks')).$asArray();

// register

	$scope.tasks = fbTasks;

//create

	$scope.postTask = function (task) {
		fbTasks.$add(task);
		toaster.pop('success',"A new task has been succesfully created.");
		$location.path('/tab/browse');
	}
//update by id

	var taskId = $stateParams.taskId;

	if (taskId) {
		$scope.selectedTask = getTask(taskId);	
	};

	function getTask (taskId) {
		return $firebase(ref.child('tasks').child(taskId)).$asObject();
	}

	$scope.updateTask = function (task) {
		$scope.selectedTask.$save(task);
		toaster.pop('success',"Task is succesfully updated.");
		$location.path('/tab/browse');
	}		


});