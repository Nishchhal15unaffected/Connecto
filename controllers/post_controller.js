const User=require('../models/users');
const Post=require('../models/post');
module.exports.postContent=function(req,res){
	Post.create(req.body,function(err,post){
		if(err){
			console.log(err,'err in post controller');
		}
		return res.redirect('/');
	})
}