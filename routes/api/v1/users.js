const express=require('express');
const router=express.Router();
const userapi=require('../../../controllers/api/v1/user_api');
router.post('/create-session',userapi.createSession);
module.exports=router;