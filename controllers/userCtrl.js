// 引入用户表操作对象
const User = require("../model/userTable");
const sendCode = require("../utils/sendCode");
const login = async (req, res, next) => {
  const { telephone, password } = req.body;

  var exist = await User.findByPhone(telephone);

  if (!exist) {
    res.json({
      code: -2,
      msg: "该手机号未注册过Inte账号",
      data: null,
    });
  } else {
    User.findByPhoneAndPsd(telephone, password)
      .then((result) => {
        if (result) {
          req.session.userInfo = result;
          req.session.telephone = telephone;
          const deletePassword = { ...result._doc, password: "********" };
          res.json({
            code: 0,
            msg: "登录成功",
            data: { data: deletePassword },
          });
        } else {
          res.json({
            code: -1,
            msg: "账号或密码输入不正确",
            data: null,
          });
        }
      })
      .catch((error) => {
        // 数据库错误
        res.json({
          code: -3,
          msg: error.message,
          data: null,
        });
      });
  }
};

/**验证手机身份 */
var telVerify = async (req, res, next) => {
  var { telephone, type } = req.query;

  var exist = await User.findByPhone(telephone);
  if (type && type === "forget") {
    if (!exist) {
      res.json({
        code: -2,
        msg: "该手机号未注册过Inte账号",
        data: null,
      });
      return;
    }
  } else {
    if (exist) {
      res.json({
        code: -2,
        msg: "该手机号已经注册过Inte账号",
        data: null,
      });
      return;
    }
  }

  // 发送验证码
  let code = [];
  for (var i = 1; i <= 6; i++) {
    code.push(Math.ceil(Math.random() * 8.9));
  }
  code = code.join("");
  req.session.code = code;
  req.session.telephone = telephone;

  sendCode(telephone, code).then(
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
        data: null,
      });
    }
  );
};

// 验证验证码
var verifyCode = async (req, res, next) => {
  var { code } = req.body;
  if (code !== req.session.code) {
    res.json({
      code: -1,
      msg: "验证码输入不正确",
      data: null,
    });
  } else {
    res.json({
      code: 0,
      msg: "验证码验证通过",
      data: null,
    });
  }
};

// 注册控制
var register = async (req, res, next) => {
  var { username, telephone, password } = req.body;
  User.add(username, telephone, password)
    .then(() => {
      res.json({
        code: 0,
        msg: "注册成功",
        data: null,
      });
    })
    .catch((err) => {
      res.json({
        code: -2,
        msg: "注册失败: " + err.message,
        data: null,
      });
    });
};

/**修改密码 */
const changePassword = async (req, res, next) => {
  var { telephone, password } = req.body;
  if (!telephone || !password) {
    res.json({
      code: -2,
      msg: "手机号或者密码为空",
      data: null,
    });
  }
  User.changePassword(telephone, password)
    .then(() => {
      res.json({
        code: 0,
        msg: "密码修改成功",
        data: null,
      });
    })
    .catch((err) => {
      res.json({
        code: -1,
        msg: "密码修改失败: " + err.message,
        data: null,
      });
    });
};

// 登录是否过期
var checkLogin = async (req, res) => {
  if (req.session.userInfo && req.session.userInfo.telephone) {
    res.json({
      code: 0,
      msg: "登录没有过期",
      data: req.session.userInfo,
    });
  } else {
    res.json({
      code: -1,
      msg: "登录过期，请重新登录",
    });
  }
};

var logout = async (req, res) => {
  delete req.session.userInfo;
  res.json({
    code: 0,
    msg: "退出登录成功",
  });
};

/**设置个性签名 */
const setSign = async (req, res, next) => {
  var { sign } = req.query;
  const telephone = req.session.telephone;
  User.setSign(telephone, sign)
    .then(() => {
      res.json({
        code: 0,
        msg: "签名设置成功",
        data: null,
      });
    })
    .catch((err) => {
      res.json({
        code: -1,
        msg: "签名设置失败: " + err.message,
        data: null,
      });
    });
};
/**设置用户信息 */
const setUserInfo = async (req, res, next) => {
  var { userInfo } = req.body;
  const telephone = req.session.telephone;
  User.setuserInfo(telephone, userInfo)
    .then(async () => {
      let newUserInfo = await User.findByPhone(telephone);
      res.json({
        code: 0,
        msg: "个人信息修改成功",
        data: newUserInfo,
      });
    })
    .catch((err) => {
      res.json({
        code: -1,
        msg: "个人信息修改失败: " + err.message,
        data: null,
      });
    });
};
/**设置个性签名 */
const getUserInfo = async (req, res, next) => {
  const telephone = req.session.telephone;
  User.findByPhone(telephone)
    .then((data) => {
      res.json({
        code: 0,
        msg: "获取用户信息成功",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        code: -1,
        msg: "获取用户信息失败: " + err.message,
        data: null,
      });
    });
};


/**发表帖子 */
module.exports = {
  login,
  register,
  telVerify,
  verifyCode,
  changePassword,
  checkLogin,
  logout,
  setSign,
  getUserInfo,
  setUserInfo,
};
