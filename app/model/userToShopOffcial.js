'use strict';

module.exports = app => {
  // 用户参与官方活动
  // $ug = [
  //   "id" => "id",
  //   "uid" => "用户的id",
  //   "gid" => "官方活动的id",
  //   "regdate"=>"添加时间"
  // ];

  const NewsSchema = new app.mongoose.Schema({
    utopid: { type: Number, unique: true },
    uid: { type: Number },
    gid: { type: String },
    regdate: { type: Date , default: Date.now }
  })

  return app.mongoose.model('UserToShopOffcial', NewsSchema)
}
