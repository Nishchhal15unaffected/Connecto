const express=require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongooseSatting');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
	name:'conecto',
	secret:'somesome',
	saveUnninitialized:false,
	resave:false,
	cookie:{
		maxAge:(1000*60*100)
	},
	store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/conecto',
    autoRemove: 'disabled'
  	}),
       function(err){
        console.log(err || 'connect-mongo setup')
       }

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){
	if(err){
		console.log(`error in running the server: ${err}`);
	}
	console.log(`successfully running the server on port : ${port}`);
});