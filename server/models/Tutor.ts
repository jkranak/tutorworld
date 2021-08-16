'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({HistorySession, TutorAvailability, UpcomingSession, TutorInfo}:any) {
      // define association here
      this.hasMany(HistorySession, {foreignKey: 'tutorId'})
      this.hasMany(UpcomingSession, {foreignKey: 'tutorId'})
      this.hasOne(TutorAvailability, {foreignKey: 'tutorId'})
      this.hasOne(TutorInfo, {foreignKey: 'tutorId'})
    }
  };

  Tutor.init({
    id: {
      type: DataTypes.INTEGER,
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