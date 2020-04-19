const Comment=require('../models/comment');
const Post=require('../models/post');
const Like=require('../models/like')
const commentsMailer=require('../mailers/comments_mailer')
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('error in creating a queue',err);
                    return;
                }
                console.log('job enqued',job.id)
            })
            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){

        if(comment.user==req.user.id){
            
            let postId=comment.post;
            comment.remove();
             Like.deleteMany({likeable:comment,onModel:'Comment'})
            req.flash('success','your comment is deleted')
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }
    })
}