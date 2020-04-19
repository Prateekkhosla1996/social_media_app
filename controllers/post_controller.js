const Post =require('../models/post');
const Comment=require('../models/comment')
const Like=require('../models/like')
module.exports.create= async function(req,res){
    try{
      let post =  await Post.create({
            content:req.body.content,
            
            user:req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"post created!"
            })
        }
        req.flash('success','your post is published!');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return;
    }
        
}
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id){

            await Like.deleteMany({likeable:post,onModel:'Post'})
            await Like.deleteMany({_id:{$in:post.comments}});
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },message:"post deleted"
                })
            }
            req.flash('success','your post and associated comments are deleted!');

            return res.redirect('back');
        }else{
            req.flash('success','you cannot delete the post!');

            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        res.redirect('back');
        return;
    }
    
}
