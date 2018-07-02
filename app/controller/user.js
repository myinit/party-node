'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg party';
  }

  async show() {
    const { ctx, service } = this;
    const userInfo = await service.userLoginInfo.getUserLoginInfo(ctx.query.id, ctx.query.open_id);

    // const userInfo = await service.user.findUserByOpenId(ctx.params.id);
    // const userInfo = await service.userLoginInfo.userLogin(ctx.params.id);

    // 设置响应体和状态码
    // if (userInfo) {
    ctx.body = {
      user_info: userInfo,
    };
    // }
    ctx.status = 200;
  }

  async create() {
    const { ctx, service } = this;

    // 校验参数
    // const createRule = {
    //   userId: 'string',
    //   content: 'string',
    // };
    // ctx.validate(createRule);
    // console.log(ctx.request.body);
    // 调用 service 处理
    const id = await service.user.create(ctx.request.body);

    // 设置响应体和状态码
    ctx.body = {
      party_id: id,
    };
    ctx.status = 201;
  }
}

module.exports = UserController;
