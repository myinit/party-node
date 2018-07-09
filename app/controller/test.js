'use strict';

const CommonController = require('./common.js');

class TestController extends CommonController {
  async index() {
    return this.returnSuccessJson("成功")
  }
  async show() {
    return this.returnFailJson("失败")
  }
}

module.exports = TestController;
