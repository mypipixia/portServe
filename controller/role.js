//引入sequelize对象
const db = require('../config/db');
const Sequelize = db.sequelize;

//引入数据表模型
const role = Sequelize.import('../module/role');
//自动创建表
role.sync({ force: false });

//数据库操作类
class roleModule {
  //查找所有的角色
  static async roleFind(status) {
    if (status != 0 && status != 1) {
      return await role.findAll({
        order: ['sort']
      });
    } else {
      return await role.findAll({
        where: { status: status },
        order: ['sort']
      });
    }
  }
  static async roleFindId(rid) {
    return await role.findOne({
      where: { rid },
      attributes: ['authArr']
    });
  }
  //栏位查找
  static async roleFindLw() {
    return await role.findAll({
      attributes: ['rid', 'rname', 'status']
    });
  }
  //新增角色
  static async roleCreate(obj) {
    return await role.create(obj);
  }
  //删除角色
  //改变角色状态 停用/启用
  static async changeStatus(obj) {
    let { status, rid } = obj;
    return await role.update(
      {
        status
      },
      {
        where: {
          rid: rid
        }
      }
    );
  }

  //分配角色权限
  static async setAuthArr(obj) {
    let { authArr, rid } = obj;
    return await role.update(
      {
        authArr
      },
      {
        where: {
          rid: rid
        }
      }
    );
  }

  //删除
  static async delRole(rid) {
    return await role.destroy({
      where: {
        rid: rid
      }
    });
  }
}

module.exports = roleModule;
