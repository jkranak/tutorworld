'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class TutorLibrary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tutor, Library}:any) {
      // define association here
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