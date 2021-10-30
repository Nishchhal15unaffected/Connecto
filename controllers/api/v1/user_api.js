const User=require('../../../models/users');
const Jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:'please type right username or password'
            })
        }
        return res.json(200,{
            message:"succufully sign in ",
            data:{
                token:Jwt.sign(user.toJSON(),'conecto',{expiresIn:'100000'})
            }
        })
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"internal server error"
        })
    }
}