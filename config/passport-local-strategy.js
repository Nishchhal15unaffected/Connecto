const passport= require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users');
//authentication using passport
passport.use(new LocalStrategy({
	usernameField:'email'
},
function(email,password,done){
	//find the user and estabblish the identidy
	User.findOne({email:email},function(err,user){
		if(err){
			console.log('Error in finding user ');
			return done(err);
		}

		if(!user || user.password!=password){
			console.log('Invalid password/user');
			return done(null,false);
		}
		console.log('seccuss');
		return done(null,user);
	});

} 

));

// serializing the user to decide with key is to be kept in the cookie 
	passport.serializeUser(function(user,done){
		done(null,user.id);
	})
	
// deserializing the user from the key in the cookie  

passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){
		if(err){
			console.log('err in finding user');
			return done(err);
		}
		return done(null,user);
	})
})

passport.checkAuthentication=function(req,res,next){
	//if the user is authencticated then pass on the req to the next function controller action
	if(req.isAuthenticated()){
		return next();
	}
	return res.redirect('users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
	//req.user contains the current signed in user from the session cookie and we are just sending this to the local for views
	if(req.isAuthenticated()){
		res.locals.user=req.user;
 	}
 	next();
}
module.exports=passport;