module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'mobileNo'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username'
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'avatar'
      },
      rid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'rid'
      }
    },
    {
      timestamps: false
    }
  );
};
