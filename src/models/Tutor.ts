'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Tutor extends Model {
    static associate({HistorySession, TutorAvailability, UpcomingSession, TutorInfo, FavTutor, TutorLibrary}:any) {

      this.hasMany(UpcomingSession, {foreignKey: {
        allowNull: false
      }})
      this.hasOne(TutorAvailability, {foreignKey: {
        allowNull: false
      }})
      this.hasOne(TutorInfo, {foreignKey: {
        allowNull: false
      }})

      this.hasMany(HistorySession,  {foreignKey: {
        allowNull: false
      }})
      this.hasMany(FavTutor, { foreignKey: {
        allowNull: false
      }})
      this.hasMany(TutorLibrary, { foreignKey: {
        allowNull: false
      }})

    }
  };

  Tutor.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Tutor',
    tableName: 'tutors',
  });
  return Tutor;
};