'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class MyPartyService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async index(uid, params) {
    let retData = {count:0, res:[]}
    if (!uid) {
      return retData
    }
    const count = await this.ctx.model.MyParty.count({uid:uid, status:1});
    // 针对查询优化
    const parties = await this.ctx.model.MyParty.fetch(params.lastPartyId, params.pageSize, {uid:uid, status:1});
    return {count:count, res:parties};
  }
  
  async show(uid, id) {
    if (!id) {
      return {}
    }
    const party = await this.ctx.model.MyParty.findById(id);
    if (!party || party.uid != uid) {
      return {}
    }
    return party;
  }

  async update(id, request) {
    if (!id || !request) {
      return;
    }
    const result = await this.ctx.model.MyParty.findByIdAndUpdate(id, { $set: request });
    return result;
  }

  async create(request) {
    if (!request) {
      return;
    }
    const result = await this.ctx.model.MyParty.create(request);
    return result;
  }

  async upMyPartyById(uid, id, request){
    if (!uid || !id || !request) {
      return;
    }
    const result = await this.ctx.model.MyParty.findOneAndUpdate({_id:id, uid:uid}, { $set: request });
    return result;
  }
}

module.exports = MyPartyService;
