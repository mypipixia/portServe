const xUserModule = require('./xUser');
const panDuan = require('../public/auth');

class xUserController {
  //新增
  static async create(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限'
      };
      return;
    }
    let parm = ctx.request.body;
    const result = await xUserModule.findUserID(parm);
    if (result) {
      ctx.status = 500;
      ctx.body = {
        desc: '该条数据已存在，请不要重复添加',
        code: -1
      };
    } else {
      await xUserModule.create(parm);
      ctx.status = 200;
      ctx.body = {
        desc: '新增成功',
        code: 1
      };
    }
  }
  static async findTable(ctx) {
    const text = ctx.request.body.text;
    const countPerPage = ctx.request.body.countPerPage;
    const currentPage = ctx.request.body.currentPage;
    const result = await xUserModule.findTable();
    let beg = countPerPage * (currentPage - 1);
    let end = beg + countPerPage;
    let data = result[0];
    if (data) {
      data = data.slice(beg, end);
    }
    data = data.filter((item) => {
      let flag1 = item.username.indexOf(text) >= 0;
      let flag2 = item.entryName.indexOf(text) >= 0;
      return flag1 || flag2;
    });
    let len = data.length;
    ctx.status = 200;
    ctx.body = {
      code: 1,
      result: data,
      len
    };
  }
  //删除
  static async delete(ctx) {
    let flag = panDuan(ctx, '*');
    if (!flag) {
      ctx.status = 500;
      ctx.body = {
        code: 0,
        desc: '用户没有权限'
      };
      return;
    }
    let id = ctx.request.body.id;
    try {
      await xUserModule.del(id);
      ctx.status = 200;
      ctx.body = {
        desc: '删除成功',
        code: 1
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        desc: '删除失败，请重试',
        code: 0
      };
    }
  }
}

module.exports = xUserController;
