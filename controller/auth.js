//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const auth = Sequelize.import('../module/auth');
//自动创建表
auth.sync({ force: false });

//数据库操作类
class authModule {
  static async authFind() {
    return await auth.findAll();
  }
}

module.exports = authModule;
