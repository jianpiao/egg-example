'use strict';
const Controller = require('egg').Controller;


class FilesController extends Controller {
  async index() {
    const { ctx } = this;
    const keyword = ctx.query.keyword || '';
    const data = await ctx.service.files.getFiles(keyword);
    ctx.body = {
      code: 200,
      list: data,
    };
  }

  // 添加文件
  async addFiles() {
    const { ctx } = this;
    const list = ctx.request.body.list || [];
    const data = await ctx.service.files.addFiles(list);
    ctx.body = {
      code: 200,
      data,
    };
  }

  // 删除文件
  async deleteFiles() {
    const { ctx } = this;
    const id = ctx.request.body.id || 0;
    const uplaod_path = ctx.request.body.uplaod_path || '';
    const file_name = ctx.request.body.file_name || '';
    const data = await ctx.service.files.deleteFiles(id, uplaod_path, file_name);
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = FilesController;
