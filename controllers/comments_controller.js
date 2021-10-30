const Comment=require('../models/comments.js');
const Post=require('../models/post.js');
const commentMailer=require('../mailer/comments_mailer');
const commentEmailWorker=require('../worker/comment_email_worker');
const queue=require('../config/kue.js'); 
module.exports.create=async function(req,res){
	try{
		let post=await Post.findById(req.body.post);
		if(post){

		let comment = await Comment.create({
		content:req.body.content,
		user:req.user._id,
		post:req.body.post
	});
			
		post.comments.push(comment);
		post.save();
		//just call save whenever update it tell the databse to save this it is final version
		comment = await comment.populate('user', 'name email').execPopulate();
		// commentMailer.newComment(comment);
		let job=queue.create('email',comment).save(function(err){
			if(err){
				console.log('error in creating queue',err);
			}
			console.log(job.id);
		})
		if(req.xhr){

    		return res.status(200).json({
				data:{
					comment:comment,
				},
				message:"comment created"
			});
		}	
		
	}
}catch(err){
	console.log('Error',err);
	return;
}
}

module.exports.distroy=async function(req,res){
try{
		let comment=await Comment.findById(req.params.id);
			if(comment.user==req.user.id){
			let postId=comment.post;
			comment.remove();

			Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}});
				return res.redirect('/');
		}
		else{
			return res.redirect('/');
			}
		}catch(err){
			console.log('Error',err);
		}
}