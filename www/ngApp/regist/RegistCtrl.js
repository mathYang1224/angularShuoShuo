define(function(require){
	var app = require("app");

	require("./registService");
	require("../ngDirectives/passwordStrengthBar");
	require("../ngServices/passwordStrengthService");

	app.controller("RegistCtrl",[
		"registService",
		"titleService",
		"passwordStrengthService",
		"$state",
		"loginService",
		function(registService,titleService,passwordStrengthService,$state,loginService){
			

			var self = this;

			//表单对象
			this.registformobj = {
				email : "",
				password : "",
				password2 : ""
			};
	 	
	 		//更改标题
			titleService.setTitle("注册");


			this.showEmailErrTip = false; 	//是否显示Email不合法的提示条
			this.emailErrTip = "";			//提示条的内容
			this.emailTipType = "";			//提示框的类型，alert-danger或者alert-successs

			//检查Email，这个函数在email输入框被blur的时候触发
			this.checkEmail = function(){
				if(this.registformobj.email == "") return;

				//第一步，检查是不是通过了正则，正则写在了HTML标签的ng-pattern中，带来的结果就是会产生ng-invalid-pattern类名
				if(this.showEmailErrTip = angular.element(registform.email).hasClass("ng-invalid-pattern")){
					this.showEmailErrTip = true;
					this.emailTipType = "alert-danger";
					this.emailErrTip = "不合法的Email地址";
					return;
				}

				//第二步，命令服务检查用户名的占用情况
				registService.checkEmailExist(this.registformobj.email,function(data){
					var isExsit = data.data.result;		//true表示可以使用，false表示已经被占用
					if(isExsit){
						//可以使用
						self.showEmailErrTip = true;	//ture表示显示提示框
						self.emailTipType = "alert-success";
						self.emailErrTip = "恭喜，可以使用！";
					}else{
						self.showEmailErrTip = true;    //ture表示显示提示框
						self.emailTipType = "alert-danger";
						self.emailErrTip = "已经被占用！";
					}
				});
			}

			//是否显示密码强度不够提示条
			this.showStrengthErrTip = false;

			//通过服务来检查密码强度
			this.getStrength = function(){
				if(this.registformobj.password == "") return;

				//密码强度
				return passwordStrengthService.caclStrength(this.registformobj.password);
			};

			//检查密码强度是不是达到了2（中级）
			this.checkStrength = function(){
				if(this.registformobj.password == "") return;
				
				this.showStrengthErrTip = this.getStrength() < 2;
			}


			///是否显示密码不相同提示条
			this.showunsametip = false;
			//检查密码是否相同
			this.checkpasswordunsame = function(){
				if(this.registformobj.password != "" && this.registformobj.password2 != ""){
					if(this.registformobj.password != this.registformobj.password2){
						this.showunsametip = true;
					}else{
						this.showunsametip = false;
					}
				}
			}


			//注册 
			this.doRegist = function(){
				//命令服务完成注册
				//用户名和密码都已经双向数据绑定到this.registformobj对象上了
				registService.doRegist(this.registformobj.email,this.registformobj.password,function(data){
					if(data.data.result == 1){
						alert("注册成功！");
						//切换状态
						$state.go("root.home");
						//命令服务改变登录状态，改变为什么，这个服务自己知道
						loginService.checkLogin();
					}else{
						alert("注册失败！");
					}
				});
			}
		}
	]);
});