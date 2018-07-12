'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async index(params) {
    // const count = await this.ctx.model.User.count({});
    // 针对查询优化
    const parties = await this.ctx.model.User.fetch(params.lastPartyId, params.pageSize);
    return parties;
  }
  async show(id) {
    if (!id) {
      return;
    }
    const party = await this.ctx.model.User.findOne({ _id: id });

    return party;
  }

  async update(opid, request) {
    if (!request) {
      return;
    }
    const result = await this.ctx.model.User.findOneAndUpdate({ opid }, { $set: request });
    return result;
  }

  async create(request) {
    if (!request || !request.open_id) {
      return;
    }
    // 获取自增id
    // const doc = await this.ctx.model.Idg.findOneAndUpdate({ modelname: 'User' });
    // console.log('+++++++docdoc+++++');
    // console.log(doc);
    // console.log('+++++++docv+++++');
    // request.open_id = doc.open_id;
    let result =  await this.findUserByOpenId(request.open_id)
    if (!result) {
      result = await this.ctx.model.User.create(request);   
    }
    return result;
  }
  
  async findUserByOpenId(openId) { 
    if (!openId) {
      return;
    }
    const result = await this.ctx.model.User.findOne({ open_id: openId });
    return result;
  }
}

module.exports = UserService;
