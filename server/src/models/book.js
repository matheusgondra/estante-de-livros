'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publishing_company: DataTypes.STRING,
    page_number: DataTypes.NUMBER,
    read: DataTypes.BOOLEAN,
    review: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};