//引入db配置
const db = require('../config/db');
//引入sequelize对象
const Sequelize = db.sequelize;

//引入数据表模型
const profit = Sequelize.import('../module/profit');
//自动创建表
profit.sync({ force: false });
//数据库操作类
class profitModule {
  //新增数据
  static async create(obj) {
    return await profit.create(obj);
  }
  //删除
  static async del(oid) {
    return await profit.destroy({
      where: { oid, status: ['草稿', '停用', '驳回'] },
    });
  }
  static async delAll(eid) {
    return await profit.destroy({
      where: { eid },
    });
  }
  //仅查用户自己的
  static async findOnlyID(arr, id, flag = false) {
    let str = arr.join(',');
    let strStu = flag
      ? "('草稿',  '停用', '驳回')"
      : "('草稿', '审核中', '停用', '驳回')";
    return await Sequelize.query(
      'SELECT op.*,xm.entryName,xm.contract,xi.yearIndex,xi.yearPlan,xmInfoJds.jdLower,xmInfoJds.jdNext FROM profits AS op LEFT JOIN xmMgrs AS xm ON op.eid = xm.eid LEFT JOIN xmInfos AS xi ON op.eid = xi.eid AND op.`year` = xi.`year` AND xi.type = "profit" LEFT JOIN xmInfoJds ON op.jd = xmInfoJds.jd AND xi.id = xmInfoJds.infoId WHERE (`status` NOT IN ' +
        strStu +
        " OR ( `status` IN ('草稿','审核中','驳回') AND uid = " +
        id +
        ' )) AND op.eid IN (' +
        str +
        ')',
      {
        raw: true,
      }
    );
  }

  //更新数据
  static async update(obj) {
    let { oid } = obj;
    return await profit.update(obj, {
      where: { oid, status: ['草稿', '停用', '驳回'] },
    });
  }

  //更新状态
  static async updateStatus(obj) {
    let { oid, status } = obj;
    let xA = '';
    switch (status) {
      case '驳回':
        xA = '审核中';
        break;
      case '审核中':
        xA = ['草稿', '驳回'];
        break;
      case '已审核':
        xA = '审核中';
        break;
      case '草稿':
        xA = '审核中';
        break;
      case '停用':
        xA = '已审核';
        break;
      default:
        break;
    }
    return await profit.update(obj, {
      where: { oid, status: xA },
    });
  }

  //查找
  static async find(id) {
    return await Sequelize.query(
      "SELECT op.*,xm.entryName,xm.contract,xi.yearIndex,xi.yearPlan,xmInfoJds.jdLower,xmInfoJds.jdNext FROM profits AS op LEFT JOIN xmMgrs AS xm ON op.eid = xm.eid LEFT JOIN xmInfos AS xi ON op.eid = xi.eid AND op.`year` = xi.`year` AND xi.type = 'profit' LEFT JOIN xmInfoJds ON op.jd = xmInfoJds.jd AND xi.id = xmInfoJds.infoId WHERE `status` NOT IN ('草稿','驳回') OR ( `status` IN ('草稿','驳回') AND uid = " +
        id +
        ' )',
      {
        raw: true,
      }
    );
  }
}

module.exports = profitModule;
