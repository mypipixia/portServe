//引入db配置
const db = require('../config/db');

//引入sequelize对象
const Sequelize = db.sequelize;
const sequelizeOp = require('sequelize');
const Op = sequelizeOp.Op;
//引入数据表模型
const user = Sequelize.import('../module/user');
//自动创建表
user.sync({ force: false });

//数据库操作类
class userModule {
  static async userRegist(data) {
    return await user.create({
      password: data.password,
      mobileNo: data.mobileNo,
      avatar: data.avatar,
      username: data.username,
      rid: data.rid
    });
  }

  static async getUserInfo(mobileNo) {
    return await Sequelize.query(
      `SELECT * FROM users LEFT JOIN roles ON users.rid = roles.rid WHERE users.mobileNo = ${mobileNo}`,
      {
        raw: true
      }
    );
  }
  //修改用户权限
  static async changeUserRole(obj) {
    let { userId, rid } = obj;
    return await user.update(
      {
        rid
      },
      { where: { userId } }
    );
  }

  //用户查找
  static async getAllTable(obj, countPerPage, currentPage) {
    let { rid = '', username = '' } = obj;
    let searchInfo = {
      rid,
      username: {
        [Op.like]: `%${username}%`
      }
    };
    !rid && delete searchInfo['rid'];
    !username && delete searchInfo['username'];
    if (countPerPage && currentPage) {
      return await user.findAll({
        where: searchInfo,
        limit: countPerPage,
        offset: countPerPage * (currentPage - 1),
        attributes: ['mobileNo', 'userId', 'username', 'rid']
      });
    } else {
      return await user.findAll({
        where: searchInfo,
        attributes: ['mobileNo', 'userId', 'username', 'rid']
      });
    }
  }
  //删除用户
  static async delUser(userId) {
    return await user.destroy({
      where: { userId }
    });
  }
  //修改用户头像
  static async changeUserAvatar(obj) {
    let { userId, avatar } = obj;
    return await user.update(
      {
        avatar
      },
      { where: { userId } }
    );
  }

  //修改用户密码或用户名
  static async changeUserInfo(obj) {
    let { userId } = obj;
    return await user.update(obj, { where: { userId } });
  }

  //按角色查找人员
  static async findRoleUser(rid) {
    return await user.findAll({
      where: { rid }
    });
  }

  //查询除超级管理员之外的用户
  static async findNotRoleUser() {
    return await Sequelize.query(
      "SELECT users.username, users.userId FROM users LEFT JOIN roles ON users.rid = roles.rid WHERE authArr != '*'",
      { raw: true }
    );
  }
}

module.exports = userModule;
