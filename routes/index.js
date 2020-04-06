const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log('router get loaded');

router.get('/',homeController.home)

router.use('/users',require('./user'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'))
router.use('/api',require('./api'))
// router.use('/routerName',require('./routerfile'))
module.exports=router;