'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
  
    static associate(models) {
      // define association here
    }
  }
 
     book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bookName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discountPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
    }
    }, {
        sequelize,
        modelName: 'book',
        tableName: 'Books',
        }
      );
    
      return book;
    };

