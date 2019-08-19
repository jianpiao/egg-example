const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const newsList = await ctx.service.news.list();
    await ctx.render('news/list.tpl', { list: newsList });
  }

  async check() {
    const { ctx } = this;
    const data = await ctx.service.news.check();
    ctx.body = data
  }

  async add() {
    const { ctx } = this;
    const text = ctx.query.text || ''
    const data = await ctx.service.news.add(text);
    ctx.body = data
  }

  async modify() {
    const { ctx } = this;
    const id = ctx.query.id || 2
    const text = ctx.query.text || ''
    const data = await ctx.service.news.modify(id, text);
    if(data.failType==1){
      ctx.body = 'id不存在'
      ctx.status = 201
    } else {
      ctx.body = data
    }
  }

  async remove() {
    const { ctx } = this;
    const id = ctx.query.id || 2
    const data = await ctx.service.news.remove(id);
    ctx.body = data
  }
}

module.exports = NewsController;
