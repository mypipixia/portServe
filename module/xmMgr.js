module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'xmMgr',
    {
      eid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      entryName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'entryName'
      },
      //合同额
      contract: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'contract'
      }
    },
    {
      timestamps: false
    }
  );
};
