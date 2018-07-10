'use strict';

const CommonController = require('../core/commonController.js');

class UserLoginController extends CommonController {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg party';
  }

  async show() {
    const { ctx, service } = this;
    const info = await service.userLogin.findOne(ctx.params.id)
    if(info){
      return this.success(info)
    }else{
      return this.fail('USER_NOT_FIND')
    }
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
    const openId = await service.wx.getOpenIdByCode(code);
    //  curl("https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code")
    if (!openId) {
      return this.fail('USER_CODE_INVALID')
    }

    const userInfo = await service.user.findUserByOpenId(openId);
    if (!userInfo) {
      return this.fail('USER_NOT_FIND')
    }
    
    return this.userLogin(userInfo)
  }
}

module.exports = UserLoginController;
