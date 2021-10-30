const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');


passport.use(new googleStrategy({
    clientID:"898494858143-9oj9ihsbtf6n20kmnajerd4q8mekadg8.apps.googleusercontent.com",
    clientSecret:"v4R0z6BLhNib1qz_7JtxuLA-",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    User.find({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google startegy',err)
            return; 
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.email[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in google startegy',err)
                    return; 
                }
                return done(null,user);
            })
        }
    })
}
))

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
module.exports=passport;