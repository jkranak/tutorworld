'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class TutorAvailability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tutor}:any) {
      // define association here
      this.belongsTo(Tutor, {foreignKey: 'tutorId'})
    }
  };
  TutorAvailability.init({
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monday: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    },
    tuesday: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    },
    wednesday: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    },
    thursday: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    },
    friday: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    },
    saturday: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    },
    sunday: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TutorAvailability',
    tableName: 'tutorsAvailability',
  });
  return TutorAvailability;
};