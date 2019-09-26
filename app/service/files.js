'use strict';

const Service = require('egg').Service;
const filterTime = require('../extend/filterTime');

class FilesService extends Service {
  async getFiles(text) {
    const list = await this.app.mysql.query(`select * from upload_files 
    where file_name like '%${text}%' 
    or file_path like '%${text}%' 
    or add_time like '%${text}%'
    order by id`);
    return list;
  }

  async addFiles(list) {
    const { ctx, app } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      for (const obj of list) {
        await conn.insert('upload_files', {
          file_name: obj.name,
          file_path: obj.url,
          add_time: filterTime(Date.now()),
        });
      }
      return { success: true };
    }, ctx);
    return result;
  }
}

module.exports = FilesService;
