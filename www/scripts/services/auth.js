'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebase){

	var ref = new Firebase(FURL);
	var auth = $firebaseAuth(ref);

	var Auth = {

		//Initializing user

		user : {},

		login: function (user) {
			return auth.$authWithPassword({
				email:user.email , password:user.password 
			});
		},
		register : function (user) {
			return auth.$createUser({ 
				email:user.email , password:user.password 
			}).then(function () {
				return Auth.login(user)
			}).then(function(data) {
				return Auth.createProfile(data.uid,user);
			});
		},
		logout: function () {
			auth.$unauth();
		},
		changePassword: function (user) {
			return auth.$changePassword({
				email:user.email , oldPassword:user.oldPass,newPassword:user.newPass 
			});
		},
		signedIn: function () {
			return !! Auth.user.provider; // Same as Auth.user && Auth.user.provider
		},
		createProfile: function (uid,user) {
			var profile = {
				name: user.name,
				email:user.email
				//gravatar:get_gravatar(user.email, 40)
			}

			var profileRef = $firebase(ref.child('profile'));
			return profileRef.$set(uid,profile);
		}							
	};

	function get_gravatar (email,size) {
		email = email.toLoweCase();
	};

	auth.$onAuth(function (authData) {
		if (authData){
			angular.copy(authData, Auth.user);
			Auth.user.profile = $firebase(ref.child('profile').child(authData.uid)).$asObject();
		} else {
			if (Auth.user && Auth.user.profile){
				Auth.user.profile.$destroy();
			}
			angular.copy({}, Auth.user);			
		}
	});

	return Auth;

});