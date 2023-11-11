const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Session extends Model {}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          date_expires: {
            type: DataTypes.DATE,
          },
          data: {
            type: DataTypes.TEXT,
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Session' 
    }
);

module.exports = Session;