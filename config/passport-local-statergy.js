const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user')
//auth using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
//find user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("error in finding user");
            req.flash('error',err);
            return done(err);
        }
        if(!user||user.password!=password){
            console.log("invalid username/password");
            req.flash('error','invalid username/password');
            return done(null,false);
        }
        return done(null,user);
    })
}
));

//serialization the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err);
        }
        return done(null,user);
    });
})

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in ,then pass on the request to the function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in 
    return res.redirect('/users/sign_in')
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated){

        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;
