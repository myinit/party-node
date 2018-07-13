'use strict';

const CommonController = require('../core/commonController.js');
/**
 * 重点服务于后端的商家活动创建
 */
class ShopPartyAdminController extends CommonController {

  async index() {
    const { ctx, service } = this;
    const result = await service.shopOfficailParty.index(ctx.query);
    return this.success(result)
  }

  async show() {
    const { ctx, service } = this;
    const result = await service.shopOfficailParty.show(ctx.params.id);
    return this.success(result)
  }

  async create() {
    const { ctx, service } = this;
    // 调用 service 处理
    const result = await service.shopOfficailParty.create(ctx.request.body);
    return this.success(result)
  }

  async update() {
    const { ctx, service } = this;
    // 调用 service 处理
    const res = await service.party.create(ctx.params.id, ctx.request.body);
    return this.success(res)
  }

  async destroy() {

  }
}

module.exports = ShopPartyAdminController;
