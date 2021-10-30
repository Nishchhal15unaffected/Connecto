const queue=require('../config/kue.js');
const commentMailer=require('../mailer/comments_mailer.js');

//worker 
queue.process('email',function(job,done){
    console.log('email worker is processing a job',job.data);
    commentMailer.newComment(job.data);
    done();
})
