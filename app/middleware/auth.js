'use strict'
const errorInfo = require('../lib/errorInfo.js')
/**
 * 判断是否登录
 * @param {Object} options 中间件的配置项
 * @param {Egg.Application} app 当前应用的实例
 * @author peytonwang
 * @return {null} null
 */
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    let loginToken = ctx.get('logintoken')
    let info = await app.redis.get(loginToken)
    info = JSON.parse(info)
    let err = errorInfo['USER_NOT_LOGIN']

    // 过滤白名单接口
    let routerIsInWhiteList = app.config.authRouterWhiteList.indexOf(ctx.path) > -1
    if (!routerIsInWhiteList) {
      if (!info) {
        // 判断是否有info
        ctx.body = {
          data: '',
          info: err[1],
          code: err[0]
        }
        return
      }
      app.config.userinfo.uid = info._id
    }
    await next()
  }
}
