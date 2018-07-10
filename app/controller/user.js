'use strict'

const CommonController = require('../core/commonController.js')

class UserController extends CommonController {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg party'
  }

  async show() {
    const { ctx, service } = this
    const userInfo = await service.userLoginInfo.getUserLoginInfo(ctx.query.id, ctx.query.open_id)

    // const userInfo = await service.user.findUserByOpenId(ctx.params.id);
    // const userInfo = await service.userLoginInfo.userLogin(ctx.params.id);

    // 设置响应体和状态码
    // if (userInfo) {
    ctx.body = {
      user_info: userInfo
    }
    // }
    ctx.status = 200
  }

  async create() {
    const { ctx, service } = this
    const code = ctx.request.body.code
    const openId = await service.wx.getOpenIdByCode(code)
    if (!openId) {
      return this.fail('USER_CODE_INVALID')
    }
    const addUser = {
      open_id: openId,
      wxuser_info: ctx.request.body.user_info
    }
    const createInfo = await service.user.create(addUser)
    if (!createInfo) {
      return this.fail('USER_CREATE_FAIL')
    }
    let retData = {}
    if (ctx.request.body.need_login == 'y') {
      return this.userLogin(userInfo)
    }
    // 设置响应体和状态码
    return this.success(createInfo)
  }  

}

module.exports = UserController
