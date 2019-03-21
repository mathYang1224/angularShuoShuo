var express = require("express");
var mongoose = require('mongoose');
var session = require('express-session');
var router = require("./controllers/router.js");

//创建app
var app = express();
//链接数据库，斜杠后面是数据库的名字
mongoose.connect('mongodb://localhost/shuoshuo');
//使用session
app.use(session({ 
	secret: 'shuoshuo', 
	cookie: { maxAge: 1000 * 60 * 20 },
	resave: false ,  
	saveUninitialized : true
}));

//静态资源文件
app.use(express.static("www"));
//路由表
app.post("/checkexist"	,router.checkexist);
app.post("/user"		,router.doRegistUser);
app.get("/checklogin"   ,router.checklogin);
app.post("/login"		,router.login);
app.get("/profile"		,router.profile);
app.post("/upload"		,router.upload);
app.get("/cut"			,router.cut);

//设置一个404页面
app.use(function(req,res){
	res.send("你好，你的页面不存在");
});

//监听
app.listen(3000,function(err){
	if(!err){
		console.log("程序已经运行在3000端口");
	}
});
