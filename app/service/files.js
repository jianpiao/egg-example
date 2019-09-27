'use strict';

const Service = require('egg').Service;
const filterTime = require('../extend/filterTime');
// node.js 文件操作对象
const fs = require('fs');

class FilesService extends Service {
  // 获取列表
  async getFiles(text) {
    const list = await this.app.mysql.query(`select * from upload_files 
    where status = 1 and (name like '%${text}%' 
    or add_time like '%${text}%')
    order by id desc`);
    return list;
  }

  // 添加文件
  async addFiles(list) {
    const { ctx, app } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      for (const obj of list) {
        await conn.insert('upload_files', {
          name: obj.name,
          file_path: obj.url,
          uplaod_path: obj.uplaod_path,
          file_name: obj.file_name,
          add_time: filterTime(Date.now()),
        });
      }
      return { success: true };
    }, ctx);
    return result;
  }

  // 删除文件
  async deleteFiles(id, uplaod_path, file_name) {
    const { ctx, app } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      // 删除本地文件
      fs.unlinkSync(this.config.baseDir + uplaod_path + '/' + file_name);
      await conn.update('upload_files', {
        id,
        status: 2,
      });
      return { success: true };
    }, ctx);
    return result;
  }
}

module.exports = FilesService;
