'use strict';

// app/service/topics.js
const Service = require('egg').Service;
const http = require('axios')

class WxService extends Service {
    constructor(ctx) {
        super(ctx);
        this.root = 'https://cnodejs.org/api/v1';
        this.appconf = {
            appid: "",
            secret: ""
        }
        this.wxAccessToken = {
            accessToken: "",
            expiresIn: 1555555343
        }
        this.userInfo = {
            openid: "",
            session_key: "",
            unionid: ""
        }
    }

    async create(params) {
        // 调用 CNode V1 版本 API
        const result = {
            data: {
                Wx_id: params.userId,
            },
        };
        // 检查调用是否成功，如果调用失败会抛出异常
        // this.checkSuccess(result);
        // 返回创建的 Wx 的 id
        return result.data.Wx_id;
    }

    // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
    checkSuccess(result) {
        if (result.status !== 200) {
            const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
            this.ctx.throw(result.status, errorMsg);
        }
        if (!result.data.success) {
            // 远程调用返回格式错误
            this.ctx.throw(500, 'remote response error', { data: result.data });
        }
    }
    
    async getOpenIdByCode(code){
        urlcode = "https://api.weixin.qq.com/sns/jscode2session?appid="+ this.appconf.appid + "&secret="+ this.appconf.secret+"&js_code="+code+"&grant_type=authorization_code"
        return await http({
            url: urlcode,
            method: 'GET'
        }).then(res => {
            console.log(res.data)
            
            this.userInfo.openid = res.data.openid
            this.userInfo.session_key = res.data.session_key
            this.userInfo.unionid = res.data.unionid || ""
            return res.data.openid
        })
    }
    
    async getAccessToken() {
        const now = new Date().getTime()
        if (this.wxAccessToken.expiresIn > now && this.wxAccessToken.accessToken != "") {
            return this.wxAccessToken.accessToken
        }
        const wxAT = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + this.appconf.appid + "&secret=" + this.appconf.secret
        console.log(wxAT);

        return await http({
            url: wxAT,
            method: 'GET'
        }).then(res => {
            console.log(res.data)
            this.wxAccessToken.accessToken = res.data.access_token
            this.wxAccessToken.expiresIn = now + res.data.expires_in * 1000
            return this.wxAccessToken.accessToken
        })
    }
}

module.exports = WxService;
