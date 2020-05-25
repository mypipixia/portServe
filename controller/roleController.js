const roleModule = require('./role');
const userModule = require('./user');
const panDuan = require('../public/auth');

class roleController {
  //查询数据
  static async findRole(ctx) {
    let obj = ctx.request.body;
    try {
      const result = await roleModule.roleFind(obj.status);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        result
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        result,
        desc: error
      };
    }
  }
  //新增
  static async createRole(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限'
      };
      return;
    }
    let obj = ctx.request.body;
    try {
      const result = await roleModule.roleCreate(obj);
      ctx.status = 200;
      ctx.body = {
        result: result.parameters,
        code: 1,
        desc: '新增成功'
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: error
      };
    }
  }
  //状态改变
  static async changeStatus(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限'
      };
      return;
    }
    let obj = ctx.request.body;
    try {
      await roleModule.changeStatus(obj);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: '修改成功'
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: error
      };
    }
  }

  //权限分配
  static async setAuthArr(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限'
      };
      return;
    }
    let obj = ctx.request.body;
    try {
      await roleModule.setAuthArr(obj);
      ctx.status = 200;
      ctx.body = {
        code: 1,
        desc: '修改成功'
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: error
      };
    }
  }

  //角色删除
  static async delRole(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限'
      };
      return;
    }
    let rid = ctx.request.body.rid;
    try {
      let result = await userModule.findRoleUser(rid);
      if (result.length > 0) {
        ctx.status = 500;
        ctx.body = {
          desc: '当前角色正在使用，无法删除'
        };
      } else {
        await roleModule.delRole(rid);
        ctx.status = 200;
        ctx.body = {
          desc: '删除成功'
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        desc: '系统错误，请重试'
      };
    }
  }

  static async findRoleID(ctx) {
    let rid = ctx.request.body.rid;
    let result = await roleModule.roleFindId(rid);
    ctx.body = {
      code: 1,
      result: result
    };
  }
}

module.exports = roleController;
