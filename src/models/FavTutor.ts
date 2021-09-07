'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Favtutor extends Model {
    static associate({Student, Tutor}:any) {
      this.belongsTo(Student)
      this.belongsTo(Tutor)

    }
  };
  Favtutor.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'FavTutor',
    tableName: 'favTutors'
  });
  return Favtutor;
};