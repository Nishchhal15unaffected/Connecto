const Post=require('../models/post');
module.exports.home=function(req,res){
	// res.cookie('nish',44);
	// // console.log(req.cookie);
	// Post.find({},function(err,posts){
	// 	return res.render('home',{
	// 	title:'home',
	// 	posts:posts
	// });
	// });
	
	// populating 
	Post.find({}).populate('user').exec(function(err,posts){
		return res.render('home',{
		title:'home',
		posts:posts
	});
	})
}