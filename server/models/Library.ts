'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({TutorLibrary}:any) {
      // define association here
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
      type: DataTypes.REAL,
      allowNull: false,
    },
    lng: {
      type: DataTypes.REAL,
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