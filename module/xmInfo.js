module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'xmInfo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'year',
      },
      //项目id
      eid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'eid',
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type',
      },
      yearPlan: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'yearPlan',
      },
      yearIndex: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'yearIndex',
      },
    },
    {
      timestamps: false,
    }
  );
};
