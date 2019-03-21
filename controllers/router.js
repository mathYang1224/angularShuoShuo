var User = require("../models/User.js");
var formidable = require("formidable");
var crypto = require("crypto");
var gm = require('gm');
var url = require("url");

//检查用户名是否被占用，{"result":true}表示可以使用，没有被占用。
exports.checkexist = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var email = fields.email;
		User.find({"email" : email},function(err,results){
			if(err){
				res.json({"result":-1});
			}else{
				res.json({"result" : results.length == 0});
			}
		});
	});
}


//执行注册
exports.doRegistUser = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err){
			res.json({"result" : -1});
			return;
		}
		//加密密码：
		var password = crypto.createHash("sha256").update(fields.password).digest('hex');

	 
		var u = new User({
			"email" : fields.email,
			"password" : password
		});

		u.save(function(err){
			if(err){
				res.json({"result" : -1});
			}else{
				//注册成功，下发SESSION
				req.session.login = true;
				req.session.email = fields.email;
				res.json({"result" : 1});
			}
		});
	});
};


//检查是否已经登录
exports.checklogin = function(req,res){
	if(req.session.login){
		res.json({"login" : true , "email" : req.session.email ,"nickname" : req.session.nickname || "没有昵称"});
	}else{
		res.json({"login" : false});
	}
}


//登录
exports.login = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err){
			res.json({"result" : -1});
			return;
		}

		//检查用户名是否存在
		User.find({"email" : fields.email},function(err,results){
			if(err){
				res.json({"result" : -1});  //服务器错误
				return;
			};
			if(results.length == 0){
				res.json({"result" : -2});  //用户名错误
				return;
			};

			//检查密码是否相同
			var password = crypto.createHash("sha256").update(fields.password).digest('hex');
			if(password === results[0].password){
				//下发session
				req.session.login = true;
				req.session.email = fields.email;
				req.session.nickname = results[0].nickname;
				res.json({"result" : 1}); //登录成功
			}else{
				res.json({"result" : -3});	//密码错误
				return;
			}
		});
	});
}


//显示当前登录的用户的资料页面
exports.profile = function(req,res){
	// //这个接口需要登录
	// if(!req.session.login){
	// 	res.json({"result" : -1 , "err" : "当前页面必须登录"});
	// 	return;
	// }

	// //检索
	// var email = req.session.email;
	var email = "shao@163.com";

	User.find({"email" : email} , function(err,results){
		res.json({
			"email" : results[0].email , 
			"nickname" :  results[0].nickname || "没有昵称",
			"avatar" :  results[0].avatar || "/images/default_avatar.jpg",
			"signature" : results[0].signature || "这家伙很懒，什么都没有留下"
		})
	});
}


//上传文件
exports.upload = function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./www/uploads";
	form.parse(req, function(err, fields, files) {
		if(err){
			res.json({"result" : -1});
			return;
		}
		//要检查一下图片的尺寸到底是不是宽度大于等于100，高度大于等于100
		//gm除了可以裁剪图片、改变图片尺寸，还能够得到图片的宽度、高度信息
		gm(files.file.path).size(function(err,size){
			if(size.width < 100 || size.height < 100){
				res.json({"result" : -2});		//-2表示尺寸不和规则
			}else{
				res.json(files);
			}
		});
    });
}


//切图片接口
exports.cut = function(req,res){

	var x = url.parse(req.url,true).query.x;
	var y = url.parse(req.url,true).query.y;
	var w = url.parse(req.url,true).query.w;
	var h = url.parse(req.url,true).query.h;
	var picurl = url.parse(req.url,true).query.url;


	gm("./" + picurl).crop(w,h,x,y).resize(100,100,"!").write("./" + picurl,function(){
		res.json({"result" : 1});
	});
		
}