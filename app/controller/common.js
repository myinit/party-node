
const BaseController = require('./base.js');

class CommonController extends BaseController {
    constructor(ctx) {
        super(ctx);
    }
    async userLogin(userInfo){
        if(!userInfo || !userInfo.open_id){
            return this.returnFailJson('USER_LOGIN_FAIL')
        }
        const {app} = this
        const loginToken = userInfo.open_id
        await app.redis.set(loginToken, userInfo);
        return this.returnSuccessJson({user_info:userInfo,login_token:loginToken})
    }
   
    async userIsLogin(loginToken){
        const info = await this.app.redis.get(loginToken)
        if (!info) {
            return false
        }
        return info
    }

}

module.exports = CommonController;
