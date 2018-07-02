'use strict';

const Controller = require('egg').Controller;
const http = require('axios')

class WxmessageController extends Controller {

  async index() {
    const { ctx, service } = this;
    let query = ctx.request.query
    // 这里是个验证
    // signature	微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
    // timestamp	时间戳
    // nonce	随机数
    // echostr	随机字符串
    // 设置响应体和状态码
    ctx.body = query["echostr"]
    ctx.status = 200;

    //  返回 echostr
  }

  async create() {
    const { ctx, service } = this;

    const postdata = ctx.request.body;
    const at = await ctx.service.wx.getAccessToken()
    if (postdata.MsgType == "event") {
      switch (postdata.Event) {
        case "user_enter_tempsession":
          // postdata.SessionFrom
          var sendMessage = {
            "touser": postdata.FromUserName,
            "msgtype": "text",
            "text":
            {
              "content": "这里是给用户的数据，通过用户的" + postdata.SessionFrom
            }
          }
          var wx = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + at
          console.log(postdata)

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
    // 设置响应体和状态码
    ctx.body = retdata;
    ctx.status = 200;
  }
}

module.exports = WxmessageController;
