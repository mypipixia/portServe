//引入db配置
const db = require('../config/db');
//引入sequelize对象
const Sequelize = db.sequelize;
//数据库操作类
class echartsModule {
  static async findEchartOne(eid, year) {
    return await Sequelize.query(
      "SELECT xi.yearIndex,xi.yearPlan,SUM(op.monthOutPut) as monthAll  FROM outputs as op LEFT JOIN  xmInfos as xi ON xi.type = 'output' AND op.`year` = xi.`year` AND op.eid = xi.eid WHERE op.`year` = " +
        year +
        ' AND op.eid = ' +
        eid +
        " AND op.`status` = '已审核' GROUP BY op.`year`"
    );
  }
  static async findEchartOne2(eid, year) {
    return await Sequelize.query(
      "SELECT xi.yearIndex,xi.yearPlan,SUM(op.monthOutPut) as monthAll  FROM turnovers as op LEFT JOIN  xmInfos as xi ON xi.type = 'turnover' AND op.`year` = xi.`year` AND op.eid = xi.eid WHERE op.`year` = " +
        year +
        ' AND op.eid = ' +
        eid +
        " AND op.`status` = '已审核' GROUP BY op.`year`"
    );
  }
  static async findEchartOne3(eid, year) {
    return await Sequelize.query(
      "SELECT xi.yearIndex,xi.yearPlan,SUM(op.monthOutPut) as monthAll  FROM profits as op LEFT JOIN  xmInfos as xi ON xi.type = 'profit' AND op.`year` = xi.`year` AND op.eid = xi.eid WHERE op.`year` = " +
        year +
        ' AND op.eid = ' +
        eid +
        " AND op.`status` = '已审核' GROUP BY op.`year`"
    );
  }

  static async findEchartOne4(eid, year) {
    return await Sequelize.query(
      "SELECT xi.yearIndex,xi.yearPlan,SUM(op.monthOutPut) as monthAll  FROM ljs as op LEFT JOIN  xmInfos as xi ON xi.type = 'lj' AND op.`year` = xi.`year` AND op.eid = xi.eid WHERE op.`year` = " +
        year +
        ' AND op.eid = ' +
        eid +
        " AND op.`status` = '已审核' GROUP BY op.`year`"
    );
  }

  static async findProfits(year) {
    return await Sequelize.query(
      'SELECT monthOutPut,`month` FROM profits where year = ' + year + ''
    );
  }
  static async findOutputs(year) {
    return await Sequelize.query(
      'SELECT monthOutPut,`month` FROM outputs where year = ' + year + ''
    );
  }
  static async findTurnover(year) {
    return await Sequelize.query(
      'SELECT monthOutPut,`month` FROM turnovers where year = ' + year + ''
    );
  }
  static async findlj(year) {
    return await Sequelize.query(
      'SELECT monthOutPut,`month` FROM ljs where year = ' + year + ''
    );
  }
  static async findXmInfoYear(year) {
    return await Sequelize.query(
      'SELECT * FROM xmInfos where year = ' + year + ''
    );
  }

  static async findEchartJd(year, table) {
    return await Sequelize.query(
      'SELECT `year`,jd,monthOutPut,`month`,eid FROM ' +
        table +
        "  WHERE  `status` = '已审核' AND  `year` = " +
        year,
      {
        raw: true,
      }
    );
  }

  static async findEchartInfoJd(year, table) {
    return await Sequelize.query(
      'SELECT xm.`year`,xm.eid,xi.jdLower,xi.jdNext,xi.jd FROM  xmInfoJds as xi LEFT JOIN xmInfos AS xm ON xm.id = xi.infoId WHERE (`year` = ' +
        year +
        ' or `year` = ' +
        (year - 1) +
        ") AND xm.type = '" +
        table +
        "'",
      {
        raw: true,
      }
    );
  }
}

module.exports = echartsModule;
