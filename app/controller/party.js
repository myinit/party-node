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
    const result = await service.party.index(uid, ctx.query);
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

  async addShopPartyById(){
    const { ctx, service } = this;
    // 校验参数
    // const createRule = {
    //   gid: 'string'
    // };
    // ctx.validate(createRule);
    // //发现扫的是商家活动自动换位置

    const shopInfo = await service.shopOfficailParty.show(ctx.params.id);
    let result = {}
    if (shopInfo) {
      result['list_type'] = -1;
      const uid = await this.getUid()
      result['add_res'] = await service.party.handleShopUserParty(uid, shopInfo)
    // } else {
    //   result['list_type'] = 0;
    //   const body = await this.handleUserPartData(ctx.request.body)
    //   if (!body) {
    //     return this.fail('PART_DATA_ERROR')
    //   }
    //   result['add_res'] = await service.myParty.create(body);
      return this.success(result)
    }
    return this.fail('ACTIVITY_ERROR')
    // // 调用 service 处理
  }

  /**
   * 创建
   */
  async create() {
    const { ctx, service } = this;
    // 校验参数
    const createRule = {
      url: 'string'
    };
    ctx.validate(createRule);
    //发现扫的是商家活动自动换位置
    const shopInfo = await service.party.urlInShop(ctx.request.body.url);
    let result = {}
    if (shopInfo) {
      result['list_type'] = -1;
      const uid = await this.getUid()
      result['add_res'] = await service.party.handleShopUserParty(uid, shopInfo)
    } else {
      result['list_type'] = 0;
      const body = await this.handleUserPartData(ctx.request.body)
      if (!body) {
        return this.fail('PART_DATA_ERROR')
      }
      result['add_res'] = await service.myParty.create(body);
    }
    // 调用 service 处理
    return this.success(result)
  }

  /**
   * 目前不需要
   */
  async update() {
  }

  /**删除关注 */
  async destroy() {
    const { ctx, service } = this;

    const uid = await this.getUid()
    const id = ctx.params.id
    const id_type = ctx.query.id_type

    // 调用 service 处理
    const ok = await service.party.destroy(uid, id, id_type);
    if (ok) {
      return this.success(ok)
    }
    return this.fail('PART_DATA_ERROR')

  }
}

module.exports = PartyController;
