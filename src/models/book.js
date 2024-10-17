'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      BookName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Book_Users',
          key: 'id',
        },
    }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Book_Users',
        }
      );
    
      return book;
    };

