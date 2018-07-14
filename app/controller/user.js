'use strict'

const CommonController = require('../core/commonController.js')

class UserController extends CommonController {
  
  async create() {
    const { ctx, service } = this
    const code = ctx.request.body.code
    const openId = await service.wx.getOpenIdByCode(code)
    if (!openId) {
      return this.fail('USER_CODE_INVALID')
    }
    const addUser = {
      open_id: openId,
      wxuser_info: ctx.request.body.wxuser_info
    }
    const createInfo = await service.user.create(addUser)
    if (!createInfo) {
      return this.fail('USER_CREATE_FAIL')
    }
    let retData = {}
    if (ctx.request.body.need_login == 'y') {
      return this.userLogin(createInfo)
    }
    // 设置响应体和状态码
    return this.success(createInfo)
  }  
}

module.exports = UserController
