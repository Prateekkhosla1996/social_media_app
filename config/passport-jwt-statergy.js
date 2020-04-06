const passport=require('passport')
const jwtstategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');


let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'coderhub'
}
passport.use(new jwtstategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log("error in finding user from JWT");
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }

    })
}));
module.exports=passport;