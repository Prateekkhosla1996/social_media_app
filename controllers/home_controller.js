const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res){
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

   try{
    let posts=await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    let users= await User.find({});
    
        return res.render('home',{
            title:"coderhub | home",
            posts :posts,
            all_users:users
    
    })
   }
   catch(err){
       console.log('error',err);
   }

}
//module.exports.actionName=function(req,res){}