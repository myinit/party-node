'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529917542330_2227'

  // add your config here
  // 全局中间件
  // 拦截所有请求
  config.middleware = ['parseToken', 'auth']
  config.parseToken = {
    demo: 'demo'
  }

  config.security = {
    csrf: { enable: false }
  }
  // config.cors = {
  //   credentials: true,
  // };

  
  config.mongoose = {
    url: 'mongodb://127.0.0.1:32769/party',
    options: {}
  }

  config.redis = {
    client: {
      port: 32768,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
  },
  config.appconf = {
    appid: "wx0e7719b0d733672d",
    secret: "44d32301756871c2b388934f91e5f46a"
  }

  return config
}
