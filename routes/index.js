const express =require('express');
const router =express.Router();
const homeController=require('../controllers/home_controller.js');
console.log('router loaded');
router.get('/',homeController.home);
router.use('/users',require('./users.js'))
router.use('/post',require('./post.js'))
router.use('/comments',require('./comments.js'))
router.use('/api',require('./api'))
module.exports=router;