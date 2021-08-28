'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Library extends Model {
    static associate({TutorLibrary}:any) {
      this.hasMany(TutorLibrary, { foreignKey: {
        allowNull: false
      }})

    }
  };
  Library.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Library',
    tableName: 'libraries',
  });
  return Library;
};