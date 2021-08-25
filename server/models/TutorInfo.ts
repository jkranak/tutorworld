'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class TutorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tutor}:any) {
      // define association here
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