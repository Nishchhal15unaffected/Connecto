const User=require('../models/users');
const Post=require('../models/post');
module.exports.create=function(req,res){
	Post.create({
		content:req.body.content,
		user:req.user._id
	},function(err,post){
		if(err){
			console.log(err,'err in post controller');
			return;
		}
		return res.redirect('/');
	})
}