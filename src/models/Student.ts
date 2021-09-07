'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Student extends Model {
    static associate({HistorySession, FavTutor, UpcomingSession}:any) {
      this.hasMany(HistorySession,  {foreignKey: {
        allowNull: false
      }})
      this.hasMany(FavTutor, { foreignKey: {
        allowNull: false
      }})
      this.hasMany(UpcomingSession, {foreignKey: {
        allowNull: false
      }})
    }
  };

  Student.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students'
  });
  return Student;
};