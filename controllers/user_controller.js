const User=require('../models/users');
module.exports.profile=function(req,res){
	
				return res.render('user_profile',{
					title:"user profile",
					// user:user
})
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
		return res.redirect('/');
}

module.exports.distroySession=function(req,res){
		req.logout();
		return res.redirect('/');
}