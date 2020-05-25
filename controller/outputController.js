const outputModule = require('./output');
const xUserModule = require('./xUser');
const panDuan = require('../public/auth');
class outputController {
  static async create(ctx) {
    let flag = panDuan(ctx, '102');
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
      await outputModule.create(obj);
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
    let flag = panDuan(ctx, '100');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    let id = ctx.request.body.id;
    const result = await outputModule.find(id);
    ctx.status = 200;
    ctx.body = {
      code: '0',
      result: result[0],
    };
  }

  //查找全部用户自己的数据
  static async findOnlyID(ctx) {
    let flag = panDuan(ctx, '100');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    let id = ctx.request.body.id;
    const arr = await xUserModule.findUserEid(id);
    let data = [];
    if (arr[0]) {
      arr[0].forEach((item) => {
        data.push(item.eid);
      });
    }
    if (!data.length) {
      ctx.status = 200;
      ctx.body = {
        code: '0',
        result: [],
      };
      return;
    }
    let flagStu = panDuan(ctx, '109') || panDuan(ctx, '107');
    const result = await outputModule.findOnlyID(data, id, flagStu);
    ctx.status = 200;
    ctx.body = {
      code: '0',
      result: result[0],
    };
  }

  //编辑
  static async update(ctx) {
    let flag = panDuan(ctx, '103');
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
      const result = await outputModule.update(obj);
      if (result[0] == 0) {
        ctx.status = 500;
        ctx.body = {
          code: 0,
          desc: '修改失败',
        };
      } else {
        ctx.status = 200;
        ctx.body = {
          code: 1,
          desc: '修改成功',
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: error,
        desc: '修改失败',
      };
    }
  }
  //更新状态
  static async updateStatus(ctx) {
    let obj = ctx.request.body;
    let auth = obj.flag + '';
    let flag = panDuan(ctx, auth);
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限',
      };
      return;
    }
    try {
      const result = await outputModule.updateStatus(obj);
      if (result[0] == 0) {
        ctx.status = 500;
        ctx.body = {
          code: -1,
          error: error,
          desc: '当前状态不允许执行该操作，请刷新表格',
        };
        return;
      }

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
        desc: '当前状态不允许执行该操作，请刷新表格',
      };
    }
  }
  //del
  static async del(ctx) {
    let flag = panDuan(ctx, '101');
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
      const result = await outputModule.del(obj);
      if (result) {
        ctx.status = 200;
        ctx.body = {
          code: 1,
          desc: '删除成功',
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          code: 1,
          desc: '删除失败',
        };
      }
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

module.exports = outputController;
