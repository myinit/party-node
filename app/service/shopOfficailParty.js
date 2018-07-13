'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class ShopOfficialPartyService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async index(params) {
    const count = await this.ctx.model.ShopParty.count({});
    // 针对查询优化
    const parties = await this.ctx.model.ShopParty.fetch(params.lastPartyId, params.pageSize);
    return { count: count, res: parties };
  }

  async show(opid) {
    const party = await this.ctx.model.ShopParty.findById(opid);
    return party;
  }

  async update(id, request) {
    if (!request) {
      return;
    }
    const result = await this.ctx.model.ShopParty.findOneAndUpdate({ _id: id }, { $set: request });
    return result;
  }

  async create(request) {
    if (!request) {
      return;
    }
    const result = await this.ctx.model.ShopParty.create(request);
    return result;
  }
}

module.exports = ShopOfficialPartyService;
