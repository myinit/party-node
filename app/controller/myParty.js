'use strict';

const CommonController = require('../core/commonController.js');

class MyPartyController extends CommonController {

  /**自己的列表 */
  async index() {
    const { ctx, service } = this;
    const uid = await this.getUid()
    const page = ctx.request.query.page
    const result = await service.myParty.index(uid, page);
    return this.success(result)
  }

  async show() {
    const { ctx, service } = this;
    const uid = await this.getUid()
    const id = ctx.params.id
    const result = await service.myParty.show(uid, id);
    return this.success(result)
  }


  /**
   * 新增的 通过提交的url自动判断是保存到哪里
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
      const uid = await this.getUid()
      result = await service.party.handleShopUserParty(uid, shopInfo)
    } else {
      const body = await this.handleUserPartData(ctx.request.body)
      if (!body) {
        return this.fail('PART_DATA_ERROR')
      }
      result = await service.myParty.create(body);
    }
    // 调用 service 处理
    return this.success(result)
  }

  async update() {
    const { ctx, service } = this;
    const updata = await this.handleUserPartData(ctx.request.body)
    if (!updata) {
      return this.fail('PART_DATA_ERROR')
    }
    const data = await service.myParty.update(ctx.params.id, updata);
    return this.success(data)
  }

  async destroy() {
    const { ctx, service } = this;

    const uid = await this.getUid()
    const id = ctx.params.id


    // 调用 service 处理
    const ok = await service.myParty.destroy(uid, id, { status: 2 });
    return this.success(ok)
    // 设置响应体和状态码
    // ctx.body = {
    //   ok: ok,
    // };
    // ctx.status = 201;
  }
}

module.exports = MyPartyController;
