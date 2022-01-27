'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    childName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    countryCode: DataTypes.INTEGER,
    password: DataTypes.STRING,
    // passwordHash: DataTypes.STRING,
    // confirmPassword: DataTypes.STRING,
    grade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};