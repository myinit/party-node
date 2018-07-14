'use strict';
module.exports = app => {
  //个人的
  // $ua = [
  //   "id" => "id",
  //   "uid" => "用户的id",
  //   "title"=>"标题",
  //   "url"=>"地址",
  //   "type"=>"txt,url",
  //   "status"=>"状态1启用2删除",
  //   "regdate"=>"添加时间",
  // ];
  const MyPartySchema = new app.mongoose.Schema({
    // spid: { type: Number  , unique: true  },
    uid: { type: String  },
    title: { type: String  },
    url: { type: String  },
    type: { type: String  },
    status: { type: String  },
    regdate: { type: Date , default: Date.now }
  });
  MyPartySchema.statics = {
    async fetch(_id, pageSize, otherWhere = {}) {
        if (_id) {
            if(otherWhere){
              otherWhere['_id'] = { "$lt": _id }
            }else {
              otherWhere = {'_id': { "$lt": _id }}
            }
            return this.find(otherWhere)
                .find()
                .limit(pageSize)
                .sort({ '_id': -1 })
        } else {
            return this.find(otherWhere)
                .limit(pageSize)
                .sort({ '_id': -1 })
        }

    },
    async findInfoByIds(ids = []){
        if (!ids && ids.length < 1) {
            return false
        }
        return this.find({ _id: ids })
    },
}

  return app.mongoose.model('MyParty', MyPartySchema);
}
