const Post=require('../models/post');
const User=require('../models/users');
module.exports.home=async function(req,res){
	// res.cookie('nish',44);
	// // console.log(req.cookie);
	// Post.find({},function(err,posts){
	// 	return res.render('home',{
	// 	title:'home',
	// 	posts:posts
	// });
	// });
	
	// populating 
	// Post.find({})
	// .populate('user')
	// .populate({
	// 	path:'comments',
	// 	populate:{
	// 		path:'user'
	// 	}
	// })
	// .exec(function(err,posts){
	// 	if(err){
	// 		console.log(err,'err in populating post');
	// 	}
	// 	User.find({},function(err,users){
	// 	return res.render('home',{
	// 	title:'home',
	// 	posts:posts,
	// 	all_users:users

	// });
	// 	})
	
	// })
	try{
		let posts=await Post.find({})
	.sort('-createdAt')
	.populate('user')
	.populate({
		path:'comments',
		populate:{
			path:'user'
		}
	});

	const users=await User.find({});
	
	return res.render('home',{
		title:'home',
		posts:posts,
		all_users:users

	});	
}catch(err){
	console.log('Error',err);
	return;
}
}