const Post =require('../models/post');
const Comment=require('../models/comment')

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

        console.log('Error', err);
        return;
    }
    
}
