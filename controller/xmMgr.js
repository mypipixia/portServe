//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;
const sequelizeOp = require('sequelize');
const Op = sequelizeOp.Op;
//引入数据表模型
const xmMgr = Sequelize.import('../module/xmMgr');
//自动创建表
xmMgr.sync({ force: false });

//数据库操作类
class xmMgrModule {
  //删除
  static async del(eid) {
    return await xmMgr.destroy({ where: { eid } });
  }

  //新增数据
  static async create(obj) {
    return await xmMgr.create(obj);
  }

  //find
  static async find(obj, countPerPage, currentPage) {
    let { entryName = '', eid = '' } = obj;
    let searchInfo = {
      entryName: {
        [Op.like]: `%${entryName}%`,
      },
      eid,
    };
    !entryName && delete searchInfo.entryName;
    !eid && delete searchInfo.eid;
    if (countPerPage && currentPage) {
      return await xmMgr.findAll({
        where: searchInfo,
        limit: countPerPage,
        offset: countPerPage * (currentPage - 1),
      });
    } else {
      return await xmMgr.findAll({
        where: searchInfo,
      });
    }
  }

  //更新数据
  static async update(obj) {
    let { eid } = obj;
    return await xmMgr.update(obj, {
      where: { eid },
    });
  }
}

module.exports = xmMgrModule;
