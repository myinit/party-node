'use strict';
module.exports = app => {
  // 官方活动
  // $g = [
  //   "id" => "标题",
  //   "title" => "标题",
  //   "url" => "地址",
  //   "qr_url" => "二维码地址",
  //   "pic_url" => "图片地址",
  //   "start_date" => "开始时间",
  //   "end_date" => "结束时间",
  //   "open_in_xcx" => "能在小程序打开",
  //   "regdate"=>"添加时间"
  // ];
  const ShopOfficialPartySchema = new app.mongoose.Schema({
    opid: { type: Number , unique: true  },
    title: { type: String  },
    url: { type: String , index: true },
    qr_url: { type: String  },
    pic_url: { type: String  },
    start_date: { type: String  },
    end_date: { type: String  },
    open_in_xcx: { type: Boolean  },
    regdate: { type: Date , default: Date.now },
  });

  ShopOfficialPartySchema.statics = {
      async fetch(_id, pageSize) {
        if (_id) {
            return this.find({'_id': {"$lt": _id}})
                .limit(pageSize)
                .sort({'_id':-1})
            }else {
                return this.find({})
                .limit(pageSize)
                .sort({'_id':-1})
            }
        
    }
}   
  return app.mongoose.model('ShopOfficialParty', ShopOfficialPartySchema);
}
