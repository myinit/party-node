'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class ShopOfficialPartyService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async index(params) {
    const count = await this.ctx.model.ShopOfficialParty.count({});
    // 针对查询优化
    const parties = await this.ctx.model.ShopOfficialParty.fetch(params.lastPartyId,params.pageSize);
    return parties;
  }
  async show(opid) {
    const party = await this.ctx.model.ShopOfficialParty.findOne({ opid });

    return party;
  }

  async update(opid, request) {
    if (!request) {
      return;
    }
    const result = await this.ctx.model.ShopOfficialParty.findOneAndUpdate({ opid }, { $set: request });
    return result;
  }

  async create(request) {
    if (!request) {
      return;
    }

    // 获取自增id
    const doc = await this.ctx.model.Idg.findOneAndUpdate({ modelname: 'counter' }, { $inc: { opid: 1 } }, { new: true });
    console.log('+++++++docdoc+++++');
    console.log(doc);
    console.log('+++++++docv+++++');
    request.opid = doc.opid;

    const result = await this.ctx.model.ShopOfficialParty.create(request);
    return result;
  }
}

module.exports = ShopOfficialPartyService;
