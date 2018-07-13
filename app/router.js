'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.resources('party', '/party', app.controller.party);
  router.resources('shopPartyAdmin', '/shop-party-admin', app.controller.shopPartyAdmin);
  router.resources('myParty', '/my-party', app.controller.myParty);
  router.resources('user', '/user', app.controller.user);
  router.resources('test', '/test', app.controller.test);
  router.resources('wxmessage', '/wxmessage', app.controller.wxmessage);
  router.resources('userLogin', '/user-login', app.controller.userLogin);
};
