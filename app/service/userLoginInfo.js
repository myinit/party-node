'use strict';

// app/service/topics.js
const Service = require('egg').Service;

class userLoginInfoService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async findOne(id) {
    if (!id) {
      return;
    }
    const party = await this.ctx.model.UserLoginInfo.findOne({ _id: id });
    return party;
  }

  async getUserLoginInfo(id, openid) {
    if (!id || !openid) {
      return;
    }
    const now = new Date().getTime();
    const userLogin = await this.ctx.model.UserLoginInfo.findOne({ _id: id, open_id: openid, expired: { $gt: now } });
    if (userLogin) {
      return userLogin.user_info;
    }
  }

  async update(id, userInfo) {
    if (!id || !userInfo) {
      return;
    }
    const result = await this.ctx.model.UserLoginInfo.findOneAndUpdate({ _id: id }, { $set: { user_info: userInfo } });
    return result;
  }

  async userLogin(openid) {
    
    if (!openid) {
      return;
    }
    const userInfo = await this.ctx.model.User.findByOpenId(openid);
    console.log(userInfo);
    if (!userInfo) {
      return;
    }
    const now = new Date().getTime() + 87600000;
    const result = await this.ctx.model.UserLoginInfo.create({ open_id: openid, expired: now, user_info: userInfo });
    return result;
  }
}

module.exports = userLoginInfoService;
