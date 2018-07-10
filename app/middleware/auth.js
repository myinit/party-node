'use strict';
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
    await next();

    let loginToken = ctx.get('logintoken');
    let info = await app.redis.get(loginToken)
    let err = errorInfo['USER_NOT_LOGIN']

    // 过滤登录接口
    if (ctx.path === '/user-login') {
      return;
    }

    // 判断是否有info
    if (!info) {
      ctx.body = {
        data: '',
        info: err[1],
        code: err[0]
      };
    }
  };
};