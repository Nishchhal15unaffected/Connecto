const nodeMailer=require('../config/nodemailer');

//this is anothor way of creating function
exports.newComment=(comment)=>{
    console.log(comment.user.email);
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:'nishchhalprajapat@gmail.com',
        to:comment.user.email,
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('err in sending the mail',err);
            return;
        }
        console.log(info);
        return; 
    });
}