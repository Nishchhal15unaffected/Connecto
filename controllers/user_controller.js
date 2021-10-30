const User=require('../models/users');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
	User.findById(req.params.id,function(err,user){
		return res.render('user_profile',{
					title:"user profile",
					profile_user:user
				})
	})
				
}
	

module.exports.update=async function(req,res){
	if(req.user.id==req.params.id){
		try{
			let user= await User.findByIdAndUpdate(req.params.id);
			User.uploadedAvtar(req,res,function(err){
				if(err){console.log('errr in multer ',err);}
					user.name=req.body.name;
					user.email=req.body.email;
					if(req.file){
						if(user.avtar){
							fs.unlinkSync(path.join(__dirname,'..',user.avtar));
						}

						user.avtar=User.avtarPath+'/'+req.file.filename;
					}
					user.save();
					return res.redirect('back');
				});
		}catch(err){
			console.log(err);
			return res.redirect('back');
		}
	}else{
		return res.status(401).send('unauthorized');
	}
}
// render the sign Up page
module.exports.signUp=function(req,res){
	if(req.isAuthenticated()){
			 res.redirect('/users/profile');
	}
	return res.render('sign_up',{
		title:'Conecto Sign Up'
	})
}

// render the sign Up page
module.exports.signIn=function(req,res){
	if(req.isAuthenticated()){
		 res.redirect('/users/profile');
	}
	return res.render('sign_in',{
		title:'Conecto Sign In'
	})
}

///create sign up submit button 
module.exports.create=function(req,res){
	if(req.body.password != req.body.Confirm_password){
		return res.redirect('back');
	}
	User.findOne({email:req.body.email},function(err,user){
		if(err){
	console.log("err in valdating email")}
	if(!user){
		User.create(req.body,function(err,user){
			if(err){
			console.log('err in create sign up collection ')
			}
		return res.redirect('/users/sign-in');
		})
		}else{
			return res.redirect('back')
		}
		
	}
		)}
module.exports.createSession=function(req,res){
		req.flash('success','successfully you have logged in');
		return res.redirect('/');
}

module.exports.distroySession=function(req,res){
		req.logout();
		req.flash('success','successfully you have logged out');
		return res.redirect('/');
}