'use strict';
const Controller = require('egg').Controller;

class FilesController extends Controller {
  async index() {
    const { ctx } = this;
    const text = ctx.query.keyword || '';
    const data = await ctx.service.files.getFiles(text);
    ctx.body = {
      code: 200,
      list: data,
    };
  }

  async addFiles() {
    const { ctx } = this;
    const list = ctx.request.body.list || [];
    const data = await ctx.service.files.addFiles(list);
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = FilesController;
