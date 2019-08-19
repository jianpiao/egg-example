'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async getOrderList() {
    const { ctx } = this;
    const data = await ctx.service.order.getoOrderList();
    ctx.body = data;
  }

  async setOrder() {
    const { ctx } = this;
    const data = await ctx.service.order.setOrder();
    ctx.body = data;
  }
}

module.exports = OrderController;
