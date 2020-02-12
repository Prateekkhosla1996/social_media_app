const express=require('express')
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,userController.profile)
router.get('/sign_up',userController.signup)
router.get('/sign_in',userController.signin)

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate('local',
{failureRedirect:'/users/sign_in'})
,userController.createSession);
router.get('/sign-out',userController.distroySession);
module.exports=router;