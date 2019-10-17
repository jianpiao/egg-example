'use strict';

const Controller = require('egg').Controller;
const filterTime = require('../extend/filterTime');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '我是EGG';
  }

  async getDate() {
    const { ctx } = this;
    ctx.body = [
      { title: '爱的发声1', data: filterTime(Date.now()) },
      { title: '爱的发声2', data: filterTime(Date.now()) },
      { title: '爱的发声3', data: filterTime(Date.now()) },
      { title: '爱的发声4', data: filterTime(Date.now()) },
      { title: '爱的发声5', data: filterTime(Date.now()) },
      { title: '爱的发声6', data: filterTime(Date.now()) },
    ];
  }
}

module.exports = HomeController;
