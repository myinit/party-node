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
    const count = await this.ctx.model.UserToShopOffcial.count({uid:uid});
    // 针对查询优化
    const pageSize = 15
    params.page < 1 && (params.page = 1)
    var start = (params.page - 1) * pageSize;
    
    // .find({uid:uid}).skip(start).limit(pageSize).sort('-_id')
    // return {count:count, res:parties};$where({uid:uid}).
    const parties = await this.ctx.model.UserToShopOffcial.find({uid:uid}).skip(start).limit(pageSize).sort('-_id')
    // .fetch(params.lastPartyId,params.pageSize); //TODO::文档在哪里？
    return  {count:count, res:parties};
    
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
