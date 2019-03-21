define(function(){
	var app = require("app");

	app.factory("registService",["$http",function($http){
		//检查Email是否被占用
		function checkEmailExist(email,callback){
			//回调函数我们这里不决定，而是直接调用用户传进来的对调函数
			$http.post("/checkexist",{"email" : email}).then(callback);
		}

		//执行注册
		function doRegist(email,password,callback){
			$http.post("/user",{"email" : email , "password" : password}).then(callback);
		}

		return {
			"checkEmailExist" : checkEmailExist,
			"doRegist" : doRegist
		}
	}]);
});