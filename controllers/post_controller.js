const User=require('../models/users');
const Post=require('../models/post');
const Comment=require('../models/comments');
module.exports.create=async function(req,res){
	try{
		let post = await Post.create({
		content:req.body.content,
		user:req.user._id
	});
		if(req.xhr){
		req.flash('success', 'Created Post');
			return res.status(200).json({
				data:{
					post:post,
				},
				message:"post created"
			});
		}
	return res.redirect('/');
}catch(err){
        req.flash('error', 'There is Problem in creating post');
	return;
}
	
}

module.exports.distroy=async function(req,res){
try{
		let post = await Post.findById(req.params.id)
		//.id means converting the object id into string
		if(post.user==req.user.id){
			post.remove();

			await Comment.deleteMany({post:req.params.id});
				
				if(req.xhr){
					return res.status(200).json({
						data:{
							post_id:req.params.id
						},
						message:"Post deleted successfully"
					})
				}

				return res.redirect('/');
		}else{
			return res.redirect('back');
		}
	}catch(err){
		console.log('Error',err);
		return;
	} 
}