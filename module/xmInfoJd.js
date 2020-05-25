module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'xmInfoJd',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      //项目年详细表id
      infoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'infoId',
      },
      eid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'eid',
      },
      jd: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'jd',
      },
      jdNext: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'jdNext',
      },
      jdLower: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'jdLower',
      },
    },
    {
      timestamps: false,
    }
  );
};
