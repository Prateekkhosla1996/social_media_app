const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res){
    // res.cookie('user_id',25);
    // post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"coderhub | home",
    //         posts:posts
    // });
    // });

    // populate the user of each posts
    
    // post.find({}).populate('user').exec(function(err,posts){
    //     return res.render('home',{
    //         title:"coderhub | home",
    //         posts: posts
    // });
    // });

    Post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home',{
                title:"coderhub | home",
                posts :posts,
                all_users:users
            });
        })
       
    });
}
//module.exports.actionName=function(req,res){}