const echartsModule = require('./echarts');
class echartsController {
  //获取表一
  static async getEchartOne(ctx) {
    let eid = ctx.request.query.eid || '';
    let year = ctx.request.query.year || '';
    if (!eid || !year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年和项目',
      };
      return;
    }
    const result = await echartsModule.findEchartOne(eid, year);
    const result1 = await echartsModule.findEchartOne2(eid, year);
    const result2 = await echartsModule.findEchartOne3(eid, year);
    const result3 = await echartsModule.findEchartOne4(eid, year);
    let data1 = result[0].length ? result[0][0] : [];
    let data2 = result1[0].length ? result1[0][0] : [];
    let data3 = result2[0].length ? result2[0][0] : [];
    let data4 = result3[0].length ? result3[0][0] : [];
    ctx.status = 200;
    ctx.body = {
      code: 0,
      result: [data1, data2, data3, data4],
    };
  }

  static async findOutputs(ctx) {
    let year = ctx.request.query.year || '';
    if (!year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年',
      };
      return;
    }
    const result = await echartsModule.findOutputs(year);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      type: 'output',
      result: result[0],
    };
  }
  static async findTurnover(ctx) {
    let year = ctx.request.query.year || '';
    if (!year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年',
      };
      return;
    }
    const result = await echartsModule.findTurnover(year);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      type: 'turnover',
      result: result[0],
    };
  }

  static async findProfits(ctx) {
    let year = ctx.request.query.year || '';
    if (!year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年',
      };
      return;
    }
    const result = await echartsModule.findProfits(year);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      type: 'profit',
      result: result[0],
    };
  }
  static async findlj(ctx) {
    let year = ctx.request.query.year || '';
    if (!year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年',
      };
      return;
    }
    const result = await echartsModule.findlj(year);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      type: 'lj',
      result: result[0],
    };
  }

  static async findXmInfoYear(ctx) {
    let year = ctx.request.query.year || '';
    if (!year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年',
      };
      return;
    }
    const result = await echartsModule.findXmInfoYear(year);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      result: result[0],
    };
  }

  static async findEchartJd(ctx) {
    let year = ctx.request.query.year || '';
    let table = ctx.request.query.table || '';
    if (!year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年',
      };
      return;
    }
    const result = await echartsModule.findEchartJd(year, table);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      result: result[0],
    };
  }

  static async findEchartInfoJd(ctx) {
    let year = ctx.request.query.year || '';
    let table = ctx.request.query.table || '';
    if (!year) {
      ctx.status = 500;
      ctx.body = {
        code: -1,
        error: '请选择年',
      };
      return;
    }
    const result = await echartsModule.findEchartInfoJd(year, table);
    ctx.status = 200;
    ctx.body = {
      code: 0,
      result: result[0],
    };
  }
}

module.exports = echartsController;
