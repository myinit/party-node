'use strict';

module.exports = app => {
  // 自增ID生成器
  const IdgSchema = new app.mongoose.Schema({
    modelname: { type: String },
    opid: { type: Number, default: 0 }, // 官方活动id
    uid: { type: Number, default: 0 }, // 用户id
    spid: { type: Number, default: 0 }, // 个人活动id
    utopid: { type: Number, default: 0 }, // 用户和官方活动对应表id
  });
  return app.mongoose.model('Idg', IdgSchema);
};
