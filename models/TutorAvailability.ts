'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class TutorAvailability extends Model {
    static associate({Tutor}:any) {
      this.belongsTo(Tutor)
    }
  };
  TutorAvailability.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    monday: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    tuesday: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    wednesday: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    thursday: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    friday: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    saturday: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    sunday: {
      type: DataTypes.JSONB,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TutorAvailability',
    tableName: 'tutorsAvailability',
  });
  return TutorAvailability;
};