'use strict';

const Controller = require('egg').Controller;
const http = require('axios')

class WxmessageController extends Controller {

  // async index() {
  //   const { ctx, service } = this;
  //   let query = ctx.request.query
  //   // 这里是个验证
  //   // signature	微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
  //   // timestamp	时间戳
  //   // nonce	随机数
  //   // echostr	随机字符串
  //   // 设置响应体和状态码
  //   ctx.body = query["echostr"]
  //   ctx.status = 200;

  //   //  返回 echostr
  // }
/**
 * 服务消息给用户返消息
 */
  async create() {
    const { ctx, service } = this;

    const postdata = ctx.request.body;
    const at = await ctx.service.wx.getAccessToken()
    const wx = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + at
    let sendMessage = {
      "touser": postdata.FromUserName,
      "msgtype": "text",
      "text":
      {
        "content": "谢谢你的回执，我们会继续努力的。"
      }
    }
    if (postdata.MsgType == "event") {
      switch (postdata.Event) {
        case "user_enter_tempsession":
          // postdata.SessionFrom
          const partyInfo = await ctx.service.party.getOneByWxFrom(postdata.SessionFrom)
          sendMessage.text.content = partyInfo
          break;

        default:
          break;
      }
    }
    // 调用 service 处理
    console.log("我请求了：" + wx)

    const retdata = await http({
      url: wx,
      method: 'POST',
      data: JSON.stringify(sendMessage) 
    }).then(res => {
      // console.log(res)
      res = res.data
      return res
    })
  }
}

module.exports = WxmessageController;
