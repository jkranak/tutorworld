'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  };
  Subject.init({
    tutorInfoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Subject',
    tableName: 'subjects',
  });
  return Subject;
};