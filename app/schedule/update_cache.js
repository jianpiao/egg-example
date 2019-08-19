module.exports = {
  schedule: {
    interval: '1ms', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const res = await ctx.service.order.setPrice();
    ctx.app.cache = res;
  },
};