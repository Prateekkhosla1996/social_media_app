const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


let transpoter= nodemailer.createTransport({
service: 'gmail',
host: 'smtp.gmail.com',
port: 587,
secure: false,
auth:{
    user: 'prateekk96.com@gmail.com',
    pass: '9891274912'
}

})
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error');return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}
module.exports={
    transpoter:transpoter,
    renderTemplate:renderTemplate
}