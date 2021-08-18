'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class HistorySession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tutor, Student}:any) {
      // define association here
      this.belongsTo(Tutor)
      this.belongsTo(Student)
    }
  };
  HistorySession.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    sessionContext: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
    starRating: {
      type: DataTypes.REAL,
    },

  }, {
    sequelize,
    modelName: 'HistorySession',
    tableName: 'historySessions',
  });
  return HistorySession;
};