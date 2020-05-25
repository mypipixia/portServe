const xmInfoJdModule = require('./xmInfoJd');
const panDuan = require('../public/auth');

class xmInfoController {
  //获取表格信息
  static async find(ctx) {
    // let flag = panDuan(ctx, '*');
    // if (!flag) {
    //   ctx.status = 500;
    //   ctx.body = {
    //     code: 0,
    //     desc: '用户没有权限',
    //   };
    //   return;
    // }
    //实际操作
    let infoId = ctx.request.query.infoId || '';
    if (!infoId) {
      ctx.status = 500;
      ctx.body = {
        code: 1,
        desc: '未查找到对应信息',
      };
      return;
    }
    try {
      const result = await xmInfoJdModule.find(infoId);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        result: result[0],
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: error,
        desc: '未查找到对应信息',
      };
    }
  }
  //新增
  static async add(ctx) {
    // let flag = panDuan(ctx, '*');
    // if (!flag) {
    //   ctx.status = 500;
    //   ctx.body = {
    //     code: 0,
    //     desc: '用户没有权限',
    //   };
    //   return;
    // }
    let { id } = ctx.request.body;
    if (id === 0) {
      try {
        const result = await xmInfoJdModule.create(ctx.request.body);
        ctx.status = 200;
        ctx.body = {
          code: 1,
          result,
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
    } else {
      try {
        const result = await xmInfoJdModule.update(ctx.request.body);
        ctx.status = 200;
        ctx.body = {
          code: 1,
          result,
          desc: '编辑成功',
        };
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: -1,
          error: error,
          desc: '编辑失败',
        };
      }
    }
  }
  //删除
  static async delete(ctx) {
    // let flag = panDuan(ctx, '*');
    // if (!flag) {
    //   ctx.status = 500;
    //   ctx.body = {
    //     code: 0,
    //     desc: '用户没有权限',
    //   };
    //   return;
    // }
    let { id } = ctx.request.body;
    try {
      const result = await xmInfoJdModule.delete(id);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        result,
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

module.exports = xmInfoController;
