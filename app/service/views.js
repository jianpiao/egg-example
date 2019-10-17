'use strict';

const Service = require('egg').Service;
const filterTime = require('../extend/filterTime');

class ViewsService extends Service {
  async index() {
    const insertData = await this.app.mysql.insert('views', { add_time: Date.now() });
    let result = null;
    if(insertData.affectedRows === 1){
      result = await this.app.mysql.select('views');
    }
    return result.length;
  }
}

module.exports = ViewsService;
