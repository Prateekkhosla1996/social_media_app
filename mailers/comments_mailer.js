const nodeMailer = require('../config/nodemailer');



exports.newComment = (comment)=>{
    console.log('inside newComment mailer',comment);
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodeMailer.transpoter.sendMail({
        from:'prateekk96.com@gmail.com',
        to:comment.user.email,
        subject:"New Comment published",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err)
            return;
        }
        console.log('Message sent',info);
        return;
    })
}