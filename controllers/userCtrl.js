// 引入用户表操作对象
const User = require("../model/userTable");

const login = async (req, res, next) => {
  const { phone, password } = req.body;

  var exist = await User.findByPhone(phone);

  if (!exist) {
    res.json({
      code: -2,
      msg: "用户名不存在",
      data: {},
    });
  } else {
    User.findByPhoneAndPsd(phone, password)
      .then((result) => {
        if (result) {
          req.session.userInfo = result;
          res.json({
            code: 0,
            msg: "登录成功",
            data: {},
          });
        } else {
          res.json({
            code: -1,
            msg: "账号或密码不正确",
            data: {},
          });
        }
      })
      .catch((error) => {
        // 数据库错误
        res.json({
          code: -3,
          msg: error.message,
          data: {},
        });
      });
  }
};

var telVerify = async (req, res, next) => {
  var { phone } = req.query;

  const sendCode = require("../utils/sendCode");
  // 发送验证码
  let code = "";
  for (var i = 1; i <= 6; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  req.session.code = code;
  req.session.phone = phone;

  sendCode(phone, code).then(
    (response) => {
      let { Code } = response;
      if (Code === "OK") {
        res.json({
          msg: "验证码发送成功",
          code: 0,
          data: req.session._id,
        });
      }
    },
    function (err) {
      res.json({
        msg: "验证码发送失败：" + err,
        code: -1,
      });
    }
  );
};

// 验证验证码
var verifyCode = async (req, res, next) => { 
  var { code } = req.body;
  if (code !== req.session.code) {
    res.json({
      msg: "验证码错误",
      code: -1,
    });
  } else {
    res.json({
      msg: "验证码验证通过",
      code: 0,
    });
  }
};

// 注册控制
var register = async (req, res, next) => {
  var { username, phone, password } = req.body;

  User.add(username, phone, password)
    .then(() => {
      res.json({
        msg: "注册成功",
        code: 0,
      });
    })
    .catch((err) => {
      res.json({
        msg: "注册失败: " + err.message,
        code: -2,
      });
    });
};

module.exports = {
  login,
  register,
  telVerify,
  verifyCode,
};
