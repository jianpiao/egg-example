const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    // read config
    const { serverUrl } = this.config.news;
    // use build-in http client to GET hacker-news api
    const list = await this.ctx.curl(`${serverUrl}/index/Index/get`, {
      data: {},
      method: 'GET',
      dataType: 'json',
    });
    if (list.data.code == 200) {
      return list.data.data;
    } else {
      return Promise.reject('错误')
    }
  }

  async check() {
    const list = await this.app.mysql.select('home');
    return list;
  }

  async add(text) {
    const row = {
      data: text,
      add_time: Date.now()
    }
    const result = await this.app.mysql.insert('home', row);
    if (result.affectedRows === 1) {
      const data = await this.app.mysql.select('home');
      return data;
    } else {
      return Promise.reject('插入失败')
    }
  }

  async modify(id, text) {
    const { ctx } = this;
    const row = {
      data: text,
      add_time: parseInt(Date.now() / 1000)
    }
    const options = {
      where: {
        id: id
      }
    }

    return await this.app.mysql.beginTransactionScope(async conn => {
      let data = await conn.select('home', {
        where: { id }
      })
      if (data.length > 0) {
        const updateSuccess = await conn.update('home', row, options);
        if (updateSuccess.affectedRows === 1) {
          data = await conn.select('home');
          return data;
        } else {
          return Promise.reject('更新失败')
        }
      } else {
        return { failType: 1 }
      }
    }, ctx);
  }

  async remove(id) {
    const { ctx } = this;
    return await this.app.mysql.beginTransactionScope(async conn => {
      const updateSuccess = await conn.delete('home', { id });
      if (updateSuccess.affectedRows === 1) {
        const data = await conn.select('home');
        return data;
      } else {
        return Promise.reject('删除失败')
      }
    }, ctx);
  }
}

module.exports = NewsService;