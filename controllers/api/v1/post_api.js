const Post=require('../../../models/post');
const Comment=require('../../../models/comments');
module.exports.index=async function(req,res){
		let posts=await Post.find({})
	.sort('-createdAt')
	.populate('user')
	.populate({
		path:'comments',
		populate:{
			path:'user'
		}});
    return res.json(200,{
        message:'List of Posts',
        post:posts
    })
}

module.exports.distroy=async function(req,res){
    try{
            let post = await Post.findById(req.params.id)
            //.id means converting the object id into string
            if(post.user==req.user.id){
                post.remove();
    
                await Comment.deleteMany({post:req.params.id});
                    
    
                    return res.json(200,{
                        message:"Post deleted successfully"
                    })
            }else{
                return res.json(500,{
                    error:'internal server error'
                })
            }
        }catch(err){
            console.log(err);
            return res.json(500,{
                message:"Internal server error"
            });
        } 
    }