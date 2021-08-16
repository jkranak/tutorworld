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
    static associate({Student, Tutor}:any) {
      // define association here
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