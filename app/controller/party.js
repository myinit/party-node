'use strict';

const Controller = require('egg').Controller;

class PartyController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg party';
  }
  async show() {
    const { ctx } = this;
    ctx.body = 'hi, egg partyshow';
  }
  async create() {
    const { ctx, service } = this;

    // 校验参数
    const createRule = {
      title: 'string',
      url: 'string',
      qr_url: 'string',
      pic_url: 'string',
      start_date: 'string',
      end_date: 'string',
      open_in_xcx: 'boolean',
    };
    ctx.validate(createRule);

    // 调用 service 处理
    const result = await service.shopOfficailParty.create(ctx.request.body);

    // 设置响应体和状态码
    ctx.body = result;
    ctx.status = 201;
  }
  async update() {
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

module.exports = PartyController;
