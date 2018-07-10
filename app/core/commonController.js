
const BaseController = require('./baseController.js');

class CommonController extends BaseController {
    constructor(ctx) {
        super(ctx);
    }
    async userLogin(userInfo){
        if(!userInfo || !userInfo.open_id){
            return this.fail('USER_LOGIN_FAIL')
        }
        const {app} = this
        const loginToken = userInfo.open_id
        await app.redis.set(loginToken, userInfo);
        return this.success({user_info:userInfo,login_token:loginToken})
    }

}

module.exports = CommonController;
