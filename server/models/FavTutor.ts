'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Favtutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  };
  Favtutor.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'FavTutor',
    tableName: 'favTutors'
  });
  return Favtutor;
};