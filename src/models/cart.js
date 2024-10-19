'use strict';
const { type } = require('@hapi/joi/lib/extend');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
 
    cart.init(
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalDiscountPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalQuantity: {
        type: DataTypes.STRING,
        allowNull: false,
      }
     
    }, {
    sequelize,
    modelName: 'cart',
    tableName: 'Carts',
    }
  );

  return cart;
};

