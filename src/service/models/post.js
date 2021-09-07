'use strict';

const {Model, DataTypes} = require(`sequelize`);

module.exports = (sequelize) => {
  class Post extends Model{}
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fullText: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    announce: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(50)
    }
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return Post;
};
