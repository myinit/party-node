'use strict';

module.exports = app => {
  const UserLoginInfoSchema = new app.mongoose.Schema({
    expired: { type: Number },
    open_id: { type: String },
    user_info: { type: Object },
  });

  return app.mongoose.model('UserLoginInfo', UserLoginInfoSchema);
};
