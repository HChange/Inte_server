const express = require('express');
const router = new express.Router();

// 引入user表的controller
const userCtrl = require('../controllers/userCtrl');

// 登录
router.post('/login', userCtrl.login)

// 注册
router.post('/register', userCtrl.register);

// 修改密码
router.post("/change_password", userCtrl.changePassword);
// 验证码
// router.get('/send_code', userCtrl.emailVerify);
router.get('/send_code', userCtrl.telVerify);
// 验证验证码
router.post("/verify_code", userCtrl.verifyCode);

module.exports = router;
