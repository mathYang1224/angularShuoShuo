define(function(require){
	var app = require('app');
	
	require("jquery"); 

	//刷一下，程序就认识指令的存在了，因为angular采用装饰者模式
	//而react、vue、angular2都采用“全局定义”的模式
	require("ngApp/ngDirectives/cut-pic");	

	app.controller('ProfileCtrl', ["titleService","$http","FileUploader","$compile","$scope",function (titleService,$http,FileUploader,$compile,$scope) {
        //更改标题
		titleService.setTitle("个人资料修改");

		//切图的信息
		this.v = {"w" : 0 , "h" : 0 , "x" : 0 , "y" : 0};

		//选项卡的信号量
		this.idx = 0; //0、1
		this.changeTab = function(number){
			this.idx = number;
		}

		var self = this;

		//从服务器上面拉取信息
		$http.get("/profile").then(function(data){
			self.formobj = data.data;
		});


		//配置一下file上传控件
		this.uploader = new FileUploader({
			url : "/upload",   		//配置上传到的路径
			autoUpload : true,		//在选择图片之后自动上传
			queueLimit  : 1,		//队列数量限制
			filters : [{			//过滤器
				fn : function(item){
					//得到这个文件的MIME类型，就是item.type
					if(
						item.type.indexOf("jpg") 	!= -1  ||
						item.type.indexOf("gif") 	!= -1 ||
						item.type.indexOf("png") 	!= -1 ||
						item.type.indexOf("jpeg")  	!= -1  ||
						item.type.indexOf("bmp")  	!= -1 
					){
						return true;
					}
					
					return false;
				}
			}],
			//添加完毕上传的文件之后要做的事情
			onAfterAddingFile : function(item){
				if(item.file.size > 400 * 1024){
					self.uploader.clearQueue();	//清空队列
					$("#file").val("");			//让file控件清空，方便再一次选择上传
					alert("请选择200kb以内的图片");
					return;
				}
			},
			//当添加文件失败的时候
			onWhenAddingFileFailed : function(){
				alert("请上传正确的文件类型！");
				self.uploader.clearQueue();	//清空队列
				$("#file").val("");			//让file控件清空，方便再一次选择上传	
				return;
			},
			//当传输完毕一张图片的时候
			onCompleteItem : function(item, response, status, headers){
				//验证图片是否已经正确上传
				if(response.result == -2){
					alert("请上传宽度大于等于100px，且高度大于等于100px的图片，别那么抠搜儿的！");
					self.uploader.clearQueue();	//清空队列
					$("#file").val("");		 //让file控件清空，方便再一次选择上传
					return;
				}
				if(response.result == -1){
					alert("服务器错误！");
					self.uploader.clearQueue();	//清空队列
					$("#file").val("");		 //让file控件清空，方便再一次选择上传
					return;
				}
				//显示大黑屏，让用户裁切图片
				self.showCutBox = true;
				//用户上传的图片的完整路径
				self.picPath = response.file.path;
				var str = response.file.path.substr(4); //去掉www/前缀

				
				//删除曾经的cut-pic组件
				$("cut-pic").remove();
				//得到编译函数，用内置的服务$compile函数
				var compileFun = $compile('<cut-pic img="' + str + '" v="profilectrl.v" maxwidth="600" maxheight="400" ></cut-pic>');
				//创建DOM对象
				var $dom = compileFun($scope);
				//上树
				$("#inner_box").append($dom);

				self.uploader.clearQueue();	//清空队列
				$("#file").val("");			//让file控件清空，方便再一次选择上传
			}
		});


		//是否显示切图大黑屏
		this.showCutBox = false;

		this.cut = function(){
			$http.get("/cut",{
				"params" : {
					w : this.v.w / this.v.ratio,
					h : this.v.h / this.v.ratio,
					x : this.v.x / this.v.ratio,
					y : this.v.y / this.v.ratio,
					url : this.picPath
				}
			}).then(function(data){
				if(data.data.result == 1) alert("图片裁切完毕！");

				//关闭编辑模式
				self.showCutBox = false;
				//显示头像为刚刚裁切好的头像
				//防止缓存，所以加上一个?querystring，浏览器会强制重新发出请求
				self.formobj.avatar = self.picPath.substr(4) + "?" + Date.parse(new Date());
			});
		}


		//用户头像
		this.getAvatar = function(){
			return self.formobj.avatar;
		}
    }]);
});