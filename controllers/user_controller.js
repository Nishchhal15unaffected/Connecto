const User=require('../models/users.js');
module.exports.profile=function(req,res){
	if(req.cookies.user_id){
		User.findById(req.cookies.user_id,function(err,user){
			if(user){
				return res.render('user_profile',{
					title:"user profile",
					user:user
				})
			}
		})
	}else{
		return res.redirect('users/sign-in');
	}
}
// render the sign Up page
module.exports.signUp=function(req,res){
	return res.render('sign_up',{
		title:'Conecto Sign Up'
	})
}

// render the sign Up page
module.exports.signIn=function(req,res){
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

}