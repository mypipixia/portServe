//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const xUser = Sequelize.import('../module/xUser');
//自动创建表
xUser.sync({ force: false });

//数据库操作类
class xUserModule {
  //新增数据
  static async create(parm) {
    return await xUser.create(parm);
  }

  //重复查询
  static async findUserID(parm) {
    let { eid, userId } = parm;
    return await xUser.findOne({
      where: {
        eid,
        userId,
      },
    });
  }

  //重复查询
  static async findUserEid(userId) {
    return await Sequelize.query(
      `SELECT * FROM xUsers WHERE userId = ${userId}`,
      {
        raw: true,
      }
    );
  }

  //表查询
  static async findTable() {
    return await Sequelize.query(
      `SELECT xUsers.id,xUsers.eid,xUsers.userId,users.username,xmMgrs.entryName FROM xUsers,xmMgrs,users WHERE xUsers.userId = users.userId and xUsers.eid = xmMgrs.eid`,
      {
        raw: true,
      }
    );
  }

  //表删除
  static async del(id) {
    return await xUser.destroy({ where: { id } });
  }

  static async delEid(id) {
    return await xUser.destroy({ where: { eid: id } });
  }

  static async delUid(id) {
    return await xUser.destroy({ where: { userId: id } });
  }
}

module.exports = xUserModule;
