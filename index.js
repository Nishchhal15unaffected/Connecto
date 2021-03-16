const express=require('express');
const app=express();
const port=8000;
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const cookieParser=require('cookie-parser')
app.use(express.urlencoded());
app.use(cookieParser());


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
	name:'conecto',
	secret:'somesome',
	saveUnninitialized:false,
	resave:false,
	cookie:{
		maxAge:(1000*60*100)
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes'))

app.listen(port,function(err){
	if(err){
		console.log(`error in running the server: ${err}`);
	}
	console.log(`successfully running the server on port : ${port}`);
});