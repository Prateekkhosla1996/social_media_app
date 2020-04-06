const passport=require('passport');
const googlestrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../models/user');

passport.use(new googlestrategy({
        clientID:"735057883857-3vhust74q0se5fe45ont0cpoh0e6f9uk.apps.googleusercontent.com",
        clientSecret:"No7UP5ANVkNrkQwYu5myazDF",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("error in google statergy-passport",err);
                return;
            }

            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user stategy-passport',err);return;
                    }
                    return done(null,user);
                })
            }
        })
}
))
module.exports=passport;