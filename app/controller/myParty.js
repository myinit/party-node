'use strict';

const CommonController = require('../core/commonController.js');

class MyPartyController extends CommonController {
  async index() {
    const { ctx, service } = this;
    const uid = await this.getUid()
    const page = ctx.request.query.page
    // const createRule = {
    //   uid: 'string',
    //   page: 'number'
    // };
    // ctx.validate(createRule);
    // 调用 service 处理
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

  async create() {
    const { ctx, service } = this;

    // 校验参数
    const createRule = {
      url: 'string'
    };
    ctx.validate(createRule);
    const body = await this.handleUserPartData(ctx.request.body)
    if (!body) {
      return this.fail('PART_DATA_ERROR')      
    }
    // 调用 service 处理
    const result = await service.myParty.create(body);
    return this.success(result)
  }

  async update() {
    const { ctx, service } = this;
    // 校验参数
    // const createRule = {
    //   userId: 'string',
    //   content: 'string',
    // };
    // ctx.validate(createRule);

    // 调用 service 处理
    
    const updata = await this.handleUserPartData(ctx.request.body)
    if (!updata) {
      return this.fail('PART_DATA_ERROR')
    }
    const data = await service.myParty.update(ctx.params.id, updata);
    return this.success(data)
  }

  async destroy() {
    const { ctx, service } = this;

    // 校验参数
    const createRule = {
      userId: 'string',
      content: 'string',
    };
    ctx.validate(createRule);

    // 调用 service 处理
    const id = await service.party.create(ctx.request.body);

    // 设置响应体和状态码
    ctx.body = {
      party_id: id,
    };
    ctx.status = 201;
  }
}

module.exports = MyPartyController;
