'use strict'

const Controller = require('egg').Controller
const _ = require('lodash');
const errorInfo = require('../lib/errorInfo.js')

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx)
    this._ = _
  }

  get user() {
    return this.ctx.session.user;
  }

  success(data, status = 200) {
    // 设置响应体和状态码
    let err = errorInfo['SERVER_REQUEST_OK']
    // 设置响应体和状态码
    this.ctx.body = {
      data: data,
      info: err[1],
      code: err[0]
    }
    this.ctx.status = status
    return
  }

  fail(code = '', data = '') {
    // 设置响应体和状态码
    let err = errorInfo['SERVER_REQUEST_FAIL']
    if (code && errorInfo[code]) {
      err = errorInfo[code]
    }
    this.ctx.body = {
      data: data,
      info: err[1],
      code: err[0]
    }
    this.ctx.status = 200
    return
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController
