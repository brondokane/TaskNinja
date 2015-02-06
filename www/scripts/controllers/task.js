'use strict';

app.controller('TaskController', function ($scope, $location, toaster, Task, Auth) {

	$scope.createTask = function() {
		
		$scope.task.status = 'open';
		$scope.task.name= Auth.user.profile.name;
		$scope.task.poster= Auth.user.uid;

		Task.createTask($scope.task).then(function(ref) {
			toaster.pop('success','Task created succesfully.');
			$scope.task = {title:'', description:'', total:'', status:'', name:'', poster:''};
			$location.path('/browse/'+ ref.key());
		});
	}; 

	$scope.editTask = function(task) {
		Task.editTask(task).then(function() {
			toaster.pop('success','Task updated succesfully.')
		});
	};
});