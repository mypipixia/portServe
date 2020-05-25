//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;
const sequelizeOp = require('sequelize');
const Op = sequelizeOp.Op;
//引入数据表模型
const xmInfoJd = Sequelize.import('../module/xmInfoJd');
//自动创建表
xmInfoJd.sync({ force: false });

//数据库操作类
class xmInfoJdModule {
  //根据项目eid查找
  static async find(infoId) {
    return await Sequelize.query(
      `SELECT * FROM xmInfoJds WHERE infoId = ${infoId}`,
      {
        raw: true,
      }
    );
  }
  //新增数据
  static async create(obj) {
    return await xmInfoJd.create(obj);
  }
  //编辑数据
  static async update(obj) {
    let { id } = obj;
    return await xmInfoJd.update(obj, {
      where: {
        id: id,
      },
    });
  }
  //删除数据
  static async delete(id) {
    return await xmInfoJd.destroy({
      where: {
        id: id,
      },
    });
  }

  static async deleteAll(id) {
    return await xmInfoJd.destroy({
      where: {
        infoId: id,
      },
    });
  }

  static async deleteEid(id) {
    return await xmInfoJd.destroy({
      where: {
        eid: id,
      },
    });
  }
}

module.exports = xmInfoJdModule;
