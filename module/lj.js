module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'lj',
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
      //本月实际两金
      monthOutPut: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'monthOutPut',
      },
      //下月计划两金
      monthNextOutPut: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'monthNextOutPut',
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
