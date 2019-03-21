var mongoose = require('mongoose');

//创建schema
var userSchema = new mongoose.Schema({
	"email" 	: String,
	"nickname" 	: String,
	"signature" : String,
	"password" 	: String,
	"avatar"    : String
});
 
//创建模型
var User = mongoose.model("User",userSchema);

module.exports = User;