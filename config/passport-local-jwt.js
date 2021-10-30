const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/users');

let opts ={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'conecto'
}

passport.use(new JWTStrategy(opts,function(payLoud,done){
    User.findById(payLoud._id,function(err,user){
        if(err){
            console.log('err',err);
            return;
        }
    
        if(user){
            done(null,user);
        }else{
            done(null,false);
        }

    })
    
 
}));

module.exports=passport;