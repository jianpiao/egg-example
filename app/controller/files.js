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

  async deleteFiles(){
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

  async removeFiles(){
    const { ctx } = this;
    const uplaod_path = ctx.request.body.uplaod_path || '';
    const file_name = ctx.request.body.file_name || '';
    const data = await ctx.service.files.deleteFiles(uplaod_path, file_name);
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = FilesController;
