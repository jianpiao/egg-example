'use strict';
const Controller = require('egg').Controller;

class ViewsController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.service.views.index();
    ctx.body = {
      code: 200,
      data: data,
    };
  }
}

module.exports = ViewsController;
