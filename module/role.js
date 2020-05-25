module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'role',
    {
      rid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      rname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'rname'
      },
      authArr: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'authArr'
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'sort'
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'status'
      }
    },
    {
      timestamps: false
    }
  );
};
