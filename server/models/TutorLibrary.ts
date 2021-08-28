'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class TutorLibrary extends Model {
    static associate({Tutor, Library}:any) {
      this.belongsTo(Tutor)
      this.belongsTo(Library)

    }
  };
  TutorLibrary.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
  }, {
    sequelize,
    modelName: 'TutorLibrary',
    tableName: 'tutorLibraries',
  });
  return TutorLibrary;
};