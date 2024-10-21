'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  order.init(
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
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalDiscountPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      books: {
        type: DataTypes.JSONB,  
        allowNull: true,
        defaultValue: [],  
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shippingAddress: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
    }

    },
    {
      sequelize,
      modelName: 'order',
      tableName: 'Orders',
    }
  );

  return order;
};
