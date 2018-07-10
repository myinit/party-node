'use strict';

module.exports = (options) => {

  return async (ctx, next) => {
    
    // 拦截 request

    // query取值方式：const id = ctx.request.query.id 适用于：/post?id=1
    // params 取值方式：const id = ctx.params.id 适用于：/post/1
    // body 取值方式 const id = ctx.request.body.id 适用于form表单提交
    if(ctx.request.body.loginToken){
      //解析loginToken
    }


    await next();


    // 拦截 response
    ctx.cookies.set('loginToken', 'userdemo');
    console.log(ctx.body)
  };
};