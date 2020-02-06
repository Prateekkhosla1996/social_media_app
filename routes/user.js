const express=require('express')
const router=express.Router();
const userController=require('../controllers/users_controller');

router.get('/profile',userController.profile)
router.get('/sign_up',userController.signup)
router.get('/sign_in',userController.signin)

router.post('/create',userController.create);
module.exports=router;