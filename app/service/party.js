'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class PartyService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async index(uid, query) {
    if (!uid && !query) {
      return;
    }
    const pageInfo = {
      lastPartyId:query.last_party_id || '',
      pageSize:parseInt(query.page_size) || 15,
    }
    switch (query.list_type) {
      case "-1":
        return this.service.userShopParty.index(uid, pageInfo)
        break;
      default:
        return this.service.myParty.index(uid, pageInfo)
    }
  }

  async getOneByWxFrom(fid) {
    if (!fid) {
      return;
    }
    const id_and_type = fid.split(':')
    const type = id_and_type[0]
    const id = id_and_type[1]
    let res = {}
    switch (type) {
      case "-1":
        res = this.model.UserToShopOffcial.findById(id);
        break;
      default:
        res = this.model.MyParty.findById(id);
    }
    if (res) {
      return "这是保存的信息： " + res.url + " 如果已经收到信息请发送1";
    }
    return "没有找到对应的信息，咋回事呢，回复0再试一试吧"
  }

  async upMyPartyById(uid, id, request) {
    if (!uid || !id || !request) {
      return;
    }
    const result = await this.ctx.model.MyParty.findOneAndUpdate({ _id: id, uid: uid }, { $set: request });
    return result;
  }

  async urlInShop(url) {
    return this.ctx.model.ShopParty.isShopOfficailParty(url);
  }

  async handleShopUserParty(uid, result) {
    if (!uid || !result) {
      return false
    }
    let map = { uid: uid, gid: result._id }
    let old = await this.ctx.model.UserToShopOffcial.findOne(map)
    map['status'] = 1
    if (old) {
      old = await this.ctx.model.UserToShopOffcial.findByIdAndUpdate(old._id, { $set: map })
    } else {
      old = await this.ctx.model.UserToShopOffcial.create(map)
    }
    return old
  }

  async destroy(uid, id, id_type){
    if (!uid || !id) {
      return;
    }
    let result = {}
    switch(id_type){
      case '-1':
      result = await this.ctx.model.UserToShopOffcial.findOneAndUpdate({_id:id, uid:uid}, { status: 2 });
      break;
      default:
      result = await this.ctx.model.MyParty.findOneAndUpdate({_id:id, uid:uid}, { status: 2 });
      break;
    }
    return result;
  }

}

module.exports = PartyService;
