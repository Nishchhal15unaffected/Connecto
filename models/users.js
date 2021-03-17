const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/conecto');
const db=mongoose.connection;

const SignUp=new mongoose.Schema({
	email:{
		type:String,
		require:true,
		unique:true
	},
	password:{
		type:String,
		require:true,
	},
	name:{
		type:String,
		require:true
	}
});

const User=mongoose.model('User',SignUp);

module.exports=User;
// module.exports=db;