module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'xUser',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      eid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'eid'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'userId'
      }
    },
    {
      timestamps: false
    }
  );
};
