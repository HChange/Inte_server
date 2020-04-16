//具体访问地址 https://help.aliyun.com/document_detail/57458.html?spm=a2c4g.11186623.4.5.86125e3cCknci3
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const {ACCESS_KEY_ID,ACCESS_KEY_SECRET,SMS_TEMPLATE_CODE,SIGN_NAME} = require('../config/secret_key')
//初始化sms_client
let smsClient = new SMSClient({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: ACCESS_KEY_SECRET,
});
// 随机生成验证码

module.exports = (tel,code) => {
    //发送短信
    return smsClient.sendSMS({
      PhoneNumbers: tel,
      // 必填: 待发送手机号。 支持以逗号分隔的形式进行批量调用， 批量上限为1000个手机号码,
      // 批量调用相对于单条调用及时性稍有延迟,
      // 验证码类型的短信推荐使用单条调用的方式； 发送国际 / 港澳台消息时， 接收号码格式为： 国际区号 + 号码， 如“ 85200000000”
      SignName: SIGN_NAME,
      // 必填: 短信签名 - 可在短信控制台中找到
      TemplateCode: SMS_TEMPLATE_CODE,
      // 必填: 短信模板 - 可在短信控制台中找到， 发送国际 / 港澳台消息时， 请使用国际 / 港澳台短信模版
      TemplateParam: `{"code":${code}}`,
      // 可选: 模板中的变量替换JSON串,
      // 如模板内容为 "亲爱的${name},您的验证码为${code}"
      // 时。
    });
}