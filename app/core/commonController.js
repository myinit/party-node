
const BaseController = require('./baseController.js');

class CommonController extends BaseController {
    constructor(ctx) {
        super(ctx);
    }

    async getUserLoginInfo(loginToken){
        const userStrInfo = await this.app.redis.get(loginToken); 
        return JSON.parse(userStrInfo)
    }

    async userLogin(userInfo) {
        if (!userInfo || !userInfo.open_id) {
            return this.fail('USER_LOGIN_FAIL')
        }
        const { app } = this
        const loginToken = userInfo.open_id
        await app.redis.set(loginToken, JSON.stringify(userInfo));
        return this.success({ user_info: userInfo, login_token: loginToken })
    }

    async handleUserPartData(partInfo) {
        // this.config.userinfo 
        const uid = await this.getUid()
        const url = partInfo.url || ''
        if (!url) {
            return {}
        }
        const title = partInfo.title || url.substr(0, 50)
        let type = 1
        if (!(url.trim().match(/^https?:\/\/[\.\w]+$/))) {
            type = 2
        }
        const status = partInfo.status || 1
        return {
            uid: uid,
            url: url,
            title: title,
            type: type,
            status: status,
        }
    }

    async getUid() {
        const uid = this.app.config.userinfo.uid
        if (!uid) {
            return this.fail('USER_NOT_LOGIN')
        }
        return uid

    }
}

module.exports = CommonController;
