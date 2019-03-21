define(function(require){
	var app = require("app");

	app.factory("loginService",["$http",function($http){
		var isLogin = false;
		var nickname = "";
		var email = "";

		return {
			checkLogin : function(){
				$http.get("/checklogin").then(function(data){
					isLogin = data.data.login;
					nickname = data.data.nickname;
					email = data.data.email;
				});
			},
			getLogin : function(){
				return isLogin;
			},
			getNickname : function(){
				return nickname;
			},
			getEmail : function(){
				return email;
			}
		}
	}]);
});