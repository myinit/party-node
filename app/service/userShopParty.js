'use strict';

// app/service/topics.js
const Service = require('egg').Service;

/**
 * 用户和官方活动的关系表
 */
class userShopParty extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(uid, params) {
    let retData = {count:0, res:[]}
    if (!uid) {
      return retData
    }
    const count = await this.ctx.model.UserToShopOffcial.count({uid:uid, status:1});
    // 针对查询优化
    const parties = await this.ctx.model.UserToShopOffcial.fetch(params.lastPartyId, params.pageSize, {uid:uid, status:1});
    return {count:count, res:parties};

  }
  
  async show(uid, id) {
    if (!id) {
      return {}
    }
    const party = await this.ctx.model.UserToShopOffcial.findById(id);
    if (!party || party.uid != uid) {
      return {}
    }
    return party;
  }

  async update(id, request) {
    if (!id || !request) {
      return;
    }
    const result = await this.ctx.model.UserToShopOffcial.findByIdAndUpdate(id, { $set: request });
    return result;
  }

  async create(request) {
    if (!request) {
      return;
    }
    const result = await this.ctx.model.UserToShopOffcial.create(request);
    return result;
  }

  async upMyPartyById(uid, id, request){
    if (!uid || !id || !request) {
      return;
    }
    const result = await this.ctx.model.UserToShopOffcial.findOneAndUpdate({_id:id, uid:uid}, { $set: request });
    return result;
  }
}

module.exports = userShopParty;
