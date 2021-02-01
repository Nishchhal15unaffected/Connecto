const User=require('../models/users.js');
module.exports.profile=function(req,res){
	return res.send('<h1>profile page bro</h1>')
}
module.exports.signUp=function(req,res){
	return res.render('sign_up',{
		title:'Conecto Sign Up'
	})
}

module.exports.signIn=function(req,res){
	return res.render('sign_in',{
		title:'Conecto Sign In'
	})
}

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
	//todo
}