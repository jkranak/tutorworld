'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TutorInfo}:any) {
      // define association here
      this.belongsToMany(TutorInfo, {foreignKey: 'tutorInfoId'})
    }
  };
  Language.init({
    tutorInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Language',
    tableName: 'languages',
  });
  return Language;
};