const User=require('../models/user')

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"profile"
    })
}
//render the sign up page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codeial|signup"
    })
}
//render the signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"codeial|signin"
    })
}
//get the signup data
module.exports.create=function(req,res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in creating user while signing up');
            return
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return
                }
                return res.redirect('/users/sign_in');
            })
            
        }
        else{
            return res.redirect('back');
        }
    });
    
}
//sign in and create a session for user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}
module.exports.distroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}