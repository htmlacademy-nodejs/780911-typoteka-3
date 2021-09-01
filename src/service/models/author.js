'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Category extends Model{}
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    passwordHash: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING(50)
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return Category;
};
