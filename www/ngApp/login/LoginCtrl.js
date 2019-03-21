define(function(require){
	var app = require("app");

	 
	app.controller("LoginCtrl",["$http","$state","loginService","titleService",function($http,$state,loginService,titleService){
		var self = this;

		titleService.setTitle("登录");

		//登录方法
		this.login = function(){
			//提交this.formobj
			$http.post("/login",this.formobj).then(function(data){
				if(data.data.result == 1){
					alert("登录成功");
					loginService.checkLogin();
					$state.go("root.home");
				}else if(data.data.result == -1){
					self.showerrtip = true;
					self.errtip = "服务器错误，请稍后再试";
				}else if(data.data.result == -2){
					self.showerrtip = true;
					self.errtip = "没有这个用户名";
				}else if(data.data.result == -3){
					self.showerrtip = true;
					self.errtip = "密码错误";
				}
			});
		}
	}]);
});