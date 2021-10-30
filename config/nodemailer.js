const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');



let transporter=nodemailer.createTransport({
    service:'gmail',
    // send mail through smtp
    host:'smtp.gmail.com',
    //587 for tlc high secure
    port:587,
    secure:false,
    //id
    auth:{
        user:'nishchhalprajapat',
        pass:'nikepogo@7799'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err){console.log('err in rendering template',err);}
            mailHtml=template;
        })
        return mailHtml;
    
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}