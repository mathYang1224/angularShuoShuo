define(function (require) {
  	var app = require("app");
  	
  	require("../ngServices/loginService.js");

    app.controller('RootCtrl', ['loginService',function (loginService) {
        var self = this;
    	//控制器一旦被实例化，就应该立即向服务器查询登录状态
        loginService.checkLogin();

        this.isLogin = function(){
            return loginService.getLogin();
        }

        this.getNickname = function(){
            return loginService.getNickname();
        }

        this.getEmail = function(){
            return loginService.getEmail();
        }
    }]);
});