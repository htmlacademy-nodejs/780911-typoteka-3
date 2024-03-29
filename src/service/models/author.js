/* eslint new-cap: ["error", { "properties": false }] */
"use strict";

const {Model, DataTypes} = require(`sequelize`);
const Alias = require("./alias");

module.exports = (sequelize) => {
  class Author extends Model{
  }

  Author.init({
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
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: {
        args: true,
        msg: "Email address already in use!"
      }
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    modelName: `Author`,
    tableName: Alias.AUTHORS
  });

  return Author;
};
