'use strict';

const Controller = require('egg').Controller;

class UserLoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg party';
  }

  async show() {
    const { ctx, service } = this;
    const userLoginInfo = await service.userLoginInfo.getUserLoginLoginInfo(ctx.query.id, ctx.query.open_id);

    // const userLoginInfo = await service.userLogin.findUserLoginByOpenId(ctx.params.id);
    // const userLoginInfo = await service.userLoginInfo.userLoginLogin(ctx.params.id);

    // 设置响应体和状态码
    // if (userLoginInfo) {
    ctx.body = {
      userLogin_info: userLoginInfo,
    };
    // }
    ctx.status = 200;
  }

  async create() {
    const { ctx, service } = this;

    // 校验参数
    // const createRule = {
    //   userLoginId: 'string',
    //   content: 'string',
    // };
    // ctx.validate(createRule);
    // console.log(ctx.request.body);
    // 调用 service 处理
    const code = ctx.request.body.code;
    const openId = await service.wxHelp.getOpenIdByCode(code);
    //  curl("https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code")

    const id = await service.userLoginInfo.userLogin(openId);

    // 设置响应体和状态码
    ctx.body = {
      party_id: id,
    };
    ctx.status = 201;
  }
}

module.exports = UserLoginController;
