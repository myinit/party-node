'use strict';

const CommonController = require('../core/commonController.js');

class PartyController extends CommonController {
  /**
   * 判断是不是商家活动的url
   */
  async isShopUrl() {

  }

  /**
   * 商家活动的展示列表
   */
  async index() {
    const { ctx, service } = this;
    const uid = await this.getUid()
    const result = await service.userShopParty.index(uid, ctx.query);
    return this.success(result)
  }

  /**
   * 单个的具体信息：可能没用
   */
  async show() {
    const { ctx, service } = this;
    const result = await service.shopOfficailParty.show(ctx.params.id);
    return this.success(result)
  }

  /**
   * 创建
   */
  async create() {
  }

  /**
   * 目前不需要
   */
  async update() {
  }

  /**删除关注 */
  async destroy() {

  }
}

module.exports = PartyController;
