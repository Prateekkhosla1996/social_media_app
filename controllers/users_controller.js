const User=require('../models/user')

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"user profile",
            profile_user:user
        });
    });
   
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('unothorized');
    }
}
//render the sign up page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"coderhub|signup"
    })
}
//render the signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"coderhub|signin"
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}
module.exports.distroySession=function(req,res){
    req.logout();
    req.flash('success','logged out sucessfully')
    return res.redirect('/');
}