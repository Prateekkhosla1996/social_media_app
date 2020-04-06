const express=require('express');
const router=express.Router();
const passport=require('passport')
const postapi=require('../../../controllers/api/v1/posts_api')
router.get('/',postapi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postapi.destroy)
module.exports=router;