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
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cost: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    sessionContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    starRating: {
      type: DataTypes.REAL,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'HistorySession',
    tableName: 'historySessions',
  });
  return HistorySession;
};