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

  const UserToShopOffcialSchema = new app.mongoose.Schema({
    uid: {type: Schema.Types.ObjectId, ref: 'User'},
    gid: {type: Schema.Types.ObjectId, ref: 'ShopParty'},
    status: { type: String  },
    regdate: { type: Date , default: Date.now }
  })
  UserToShopOffcialSchema.statics = {
    async fetch(_id, pageSize, otherWhere = {}) {
        if (_id) {
            if(otherWhere){
              otherWhere['_id'] = { "$lt": _id }
            }else {
              otherWhere = {'_id': { "$lt": _id }}
            }
            return this.find(otherWhere)
                .populate('gid')
                .limit(pageSize)
                .sort({ '_id': -1 })
        } else {
            return this.find(otherWhere)
                .populate('gid')
                .limit(pageSize)
                .sort({ '_id': -1 })
        }
    },
    async findInfoByIds(ids = []){
        if (!ids && ids.length < 1) {
            return false
        }
        return this.find({ _id: ids })
        .populate('gid')
    },
  }
  return app.mongoose.model('UserToShopOffcial', UserToShopOffcialSchema)
}
