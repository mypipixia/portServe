module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'auth',
        {
            aid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            authName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'authName'
            },
            pid: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'pid'
            },
            roleIndex: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'roleIndex'
            }
        },
        {
            timestamps: false,
        }
    );
}