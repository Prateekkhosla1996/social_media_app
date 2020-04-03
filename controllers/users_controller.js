const User=require('../models/user')
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"user profile",
            profile_user:user
        });
    });
   
}

module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('unothorized');
    // }
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);

            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("******multer error********");
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..',user.avatar))
                    }
                    user.avatar=User.avatarPath+ '/' +req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        
    
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        if(req.user.id==req.params.id){
    }
}}
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
        req.flash('error',"password dosent match");
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            req.flash('error',"invalid email");
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
