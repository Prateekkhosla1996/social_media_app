const Post=require('../models/post');

module.exports.home=function(req,res){
    // res.cookie('user_id',25);
    // post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"codeial | home",
    //         posts:posts
    // });
    // });

    // populate the user of each posts
    // post.find({}).populate('user').exec(function(err,posts){
    //     return res.render('home',{
    //         title:"codeial | home",
    //         posts: posts
    // });
    // });

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"codeial | home",
            posts :posts
        });
    });
}
//module.exports.actionName=function(req,res){}