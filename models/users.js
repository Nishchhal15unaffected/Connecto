const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVTAR_PATH=path.join("/uploads/users/avtars");
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
	},
	avtar:{
		type:String
	}
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..',AVTAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

//static
SignUp.statics.uploadedAvtar=multer({storage:storage}).single('avtar');
SignUp.statics.avtarPath=AVTAR_PATH;
const User=mongoose.model('User',SignUp);

module.exports=User;
// module.exports=db;