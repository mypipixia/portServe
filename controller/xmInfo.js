//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;
const sequelizeOp = require('sequelize');
const Op = sequelizeOp.Op;
//引入数据表模型
const xmInfo = Sequelize.import('../module/xmInfo');
//自动创建表
xmInfo.sync({ force: false });

//数据库操作类
class xmInfoModule {
  //根据项目eid查找
  static async find(eid, type) {
    return await Sequelize.query(
      'SELECT * FROM xmInfos WHERE eid = ' + eid + " and type = '" + type + "'",
      {
        raw: true,
      }
    );
  }
  //查找对应项目年份是否重复
  static async cnki(obj) {
    return await xmInfo.findOne({
      where: obj,
    });
  }
  //新增数据
  static async create(obj) {
    return await xmInfo.create(obj);
  }
  //编辑数据
  static async update(obj) {
    let { id } = obj;
    return await xmInfo.update(obj, {
      where: {
        id: id,
      },
    });
  }
  //删除数据
  static async delete(id) {
    return await xmInfo.destroy({
      where: {
        id: id,
      },
    });
  }

  static async deleteAll(id) {
    return await xmInfo.destroy({
      where: {
        eid: id,
      },
    });
  }
}

module.exports = xmInfoModule;
