'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getDate', controller.home.getDate);

  /** 新闻 **/
  router.get('/news', controller.news.list);
  router.get('/add', controller.news.add);
  router.get('/check', controller.news.check);
  router.get('/modify', controller.news.modify);
  router.get('/remove', controller.news.remove);

  /** 订单 **/
  router.get('/getOrderList', controller.order.getOrderList);
  router.get('/setOrder', controller.order.setOrder);

  /** 文件上传 **/
  router.post('/upload', controller.upload.index);
};
