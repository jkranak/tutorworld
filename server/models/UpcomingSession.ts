'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class UpcomingSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tutor, Student}:any) {
      // define association here
      this.belongsTo(Tutor, {foreignKey: 'tutorId'})
      this.belongsTo(Student, {foreignKey: 'studentId'})
    }
  };
  UpcomingSession.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessionContext: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'UpcomingSession',
    tableName: 'upcomingSessions',
  });
  return UpcomingSession;
};