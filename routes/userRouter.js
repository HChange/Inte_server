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
// 检查登录是否过期
router.post("/check_login",userCtrl.checkLogin)
// 退出登录
router.post("/logout",userCtrl.logout)
// 设置个性签名
router.get("/set_sign",userCtrl.setSign)
// 获得用户信息
router.get("/get_userInfo",userCtrl.getUserInfo)
// 设置用户信息
router.post("/set_userInfo",userCtrl.setUserInfo)

module.exports = router;
