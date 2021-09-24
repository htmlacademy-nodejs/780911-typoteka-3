"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Alias = require("./alias");
class Category extends Model {

}

const define = (sequelize) => Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize,
  freezeTableName: true,
  modelName: `Category`,
  tableName: Alias.CATEGORIES
});

module.exports = define;

// "use strict";
//
// const {Model, DataTypes} = require(`sequelize`);
// const Alias = require("./alias");
//
// module.exports = (sequelize) => {
//   class Category extends Model{}
//   Category.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING(30),
//       allowNull: false,
//     },
//   }, {
//     sequelize,
//     freezeTableName: true,
//     modelName: `Category`,
//     tableName: Alias.CATEGORIES
//   });
//
//   return Category;
// };
