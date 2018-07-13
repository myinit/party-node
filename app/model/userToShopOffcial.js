'use strict';
const {Schema} = require('mongoose')
module.exports = app => {
  // 用户参与官方活动
  // $ug = [
  //   "id" => "id",
  //   "uid" => "用户的id",
  //   "gid" => "官方活动的id",
  //   "regdate"=>"添加时间"
  // ];

  const NewsSchema = new app.mongoose.Schema({
    uid: {type: Schema.Types.ObjectId, ref: 'User'},
    gid: {type: Schema.Types.ObjectId, ref: 'ShopOfficialParty'},
    status: { type: String  },
    regdate: { type: Date , default: Date.now }
  })

  return app.mongoose.model('UserToShopOffcial', NewsSchema)
}
