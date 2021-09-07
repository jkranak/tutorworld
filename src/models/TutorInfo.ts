'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class TutorInfo extends Model {
    static associate({Tutor}:any) {
      this.belongsTo(Tutor)

    }
  };
  TutorInfo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.REAL,
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    subjectLevels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'TutorInfo',
    tableName: 'tutorsInfo',
  });
  return TutorInfo;
};