'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529917542330_2227'

  // add your config here
  config.middleware = []

  config.security = {
    csrf: { enable: false }
  }
  // config.cors = {
  //   credentials: true,
  // };

  
  config.mongoose = {
    url: 'mongodb://127.0.0.1/party',
    options: {}
  }


  return config
}
