'use strict';

module.exports = app => {
  const UsersSchema = new app.mongoose.Schema({
    uid: { type: Number },
    open_id: { type: String, unique: true },
    create_time: { type: Date, default: Date.now },
    wxuser_info: { type: Object },
  });
  UsersSchema.statics.findByOpenId = function(openId) {
    return this.findOne({ open_id: openId });
  };

  return app.mongoose.model('User', UsersSchema);
};
