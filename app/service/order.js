'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
  async getoOrderList() {
    const list = await this.app.mysql.select('price');
    return list;
  }

  async setOrder() {
    const { ctx } = this;
    return await this.app.mysql.beginTransactionScope(async conn => {
      await conn.insert('price', { price: 1 });
      const data = await this.app.runSchedule('update_cache');
      return data;
    }, ctx);
  }

  async setPrice() {
    const { ctx } = this;
    return await this.app.mysql.beginTransactionScope(async conn => {
      const data = await conn.select('price');
      const row = {
        price: data[0].price + 1
      }
      const options = {
        where: {
          id: data[0].id
        }
      }
      await conn.update('price', row, options);
    }, ctx);
  }
}

module.exports = OrderService;