module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'turnover',
    {
      oid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'status',
      },
      eid: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'eid',
      },
      jd: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'jd',
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'year',
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'month',
      },
      //本月实际产值
      monthOutPut: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'monthOutPut',
      },
      //下月计划产值
      monthNextOutPut: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'monthNextOutPut',
      },
      //公司下发下月产值
      monthLowerOutPut: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'monthLowerOutPut',
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'uid',
      },
    },
    {
      timestamps: false,
    }
  );
};
