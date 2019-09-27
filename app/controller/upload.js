'use strict';

// node.js 文件操作对象
const fs = require('fs');
// node.js 路径操作对象
const path = require('path');
// egg.js Controller
const Controller = require('egg').Controller;
// 二进制的写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
// 还有我们这里使用了egg-multipart
// const md5 = require('md5');
const filterDay = require('../extend/filterDay');

class UploadController extends Controller {

  async index() {
    const ctx = this.ctx;
    // egg-multipart 已经帮我们处理文件二进制对象
    const stream = await ctx.getFileStream();

    // 生成文件夹
    const dirname = filterDay(Date.now(), '/');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      }
    }
    mkdirsSync(path.join(this.config.baseDir, dirname));

    // 新建一个文件名
    const filename = stream.filename + '_' + Date.now() + path.extname(stream.filename);
    // 目标文件路径
    const target = path.join(this.config.baseDir, dirname, filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现异常,关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    // 文件响应
    ctx.body = {
      name: stream.filename,
      url: path.join(this.config.baseDir, dirname, filename),
      uplaod_path: dirname,
      file_name: filename,
    };
  }
}

module.exports = UploadController;
