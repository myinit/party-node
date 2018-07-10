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
  const MyParty = new app.mongoose.Schema({
    // spid: { type: Number  , unique: true  },
    uid: { type: String  },
    title: { type: String  },
    url: { type: String  },
    type: { type: String  },
    status: { type: String  },
    regdate: { type: Date , default: Date.now }
  });

  return app.mongoose.model('MyParty', MyParty);
}
