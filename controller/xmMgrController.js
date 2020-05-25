const xmMgrModule = require('./xmMgr');
const xUserModule = require('./xUser');
const outputModule = require('./output');
const profitModule = require('./profit');
const turnoverModule = require('./turnover');
const ljModule = require('./lj');
const xmInfoModule = require('./xmInfo');
const xmInfoJdModule = require('./xmInfoJd');

const panDuan = require('../public/auth');

class xmMgrController {
  static async create(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    let obj = ctx.request.body;
    try {
      await xmMgrModule.create(obj);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: '新增成功',
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: error,
        desc: '新增失败',
      };
    }
  }

  //查找全部用户
  static async getAllTable(ctx) {
    let req = ctx.request.body.searchInfo;
    let { userId } = req;
    if (userId) {
      const arr = await xUserModule.findUserEid(userId);
      let data = [];
      if (arr[0]) {
        arr[0].forEach((item) => {
          data.push(item.eid);
        });
      }
      req.eid = data;
    }
    const countPerPage = ctx.request.body.countPerPage;
    const currentPage = ctx.request.body.currentPage;
    const result = await xmMgrModule.find(req, countPerPage, currentPage);
    const len = await xmMgrModule.find(req);
    ctx.status = 200;
    ctx.body = {
      code: '0',
      result: result,
      len: len.length,
    };
  }

  //编辑
  static async update(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    let obj = ctx.request.body;
    try {
      await xmMgrModule.update(obj);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: '修改成功',
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: error,
        desc: '修改失败',
      };
    }
  }
  //del
  static async del(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    let obj = ctx.request.body.ids;
    try {
      obj.forEach(async (item) => {
        await outputModule.delAll(item);
        await profitModule.delAll(item);
        await turnoverModule.delAll(item);
        await ljModule.delAll(item);
        await xmInfoModule.deleteAll(item);
        await xmInfoJdModule.deleteEid(item);
        await xUserModule.delEid(item);
        await xmMgrModule.del(item);
      });
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: '删除成功',
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: error,
        desc: '删除失败',
      };
    }
  }
}

module.exports = xmMgrController;
