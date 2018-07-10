'use strict';

const CommonController = require('../core/commonController.js');

class TestController extends CommonController {
  async index() {
    return this.success("成功")
  }
  async show() {
    return this.fail("失败")
  }
}

module.exports = TestController;
