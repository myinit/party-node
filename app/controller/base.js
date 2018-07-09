'use strict';

const Controller = require('egg').Controller;
const errorInfo = require('../lib/errorInfo.js');

class BaseController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async returnSuccessJson(data) {
        // 设置响应体和状态码
        let err = errorInfo['SERVER_REQUEST_OK']
        // 设置响应体和状态码
        this.ctx.body = {
            data: data,
            info: err[1],
            code: err[0],
        };
        this.ctx.status = 200;
        return
    }
    async returnFailJson(code = '', data = '') {
        // 设置响应体和状态码
        let err = errorInfo['SERVER_REQUEST_FAIL']
        if (code && errorInfo[code]) {
            err = errorInfo[code]
        }
        this.ctx.body = {
            data: data,
            info: err[1],
            code: err[0],
        };
        this.ctx.status = 200;
        return
    }

}

module.exports = BaseController;
