'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishList extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  wishList.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      books: {
        type: DataTypes.JSONB,  
        allowNull: true,
        defaultValue: [],  
      },
    },
    {
      sequelize,
      modelName: 'wishList',
      tableName: 'wishList',
    }
  );

  return wishList;
};
