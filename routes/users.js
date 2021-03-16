const express =require('express');
const router =express.Router();
const passport =require('passport');
const userController=require('../controllers/user_controller.js');
router.get('/profile',userController.profile);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
//use passport as midleware
router.post('/create-session',passport.authenticate(
	'local',
	{failureRedirect:'/users/sign-in'}),
	userController.createSession);
module.exports=router;