'use strict';
import {
  Model
} from 'sequelize';
import { SenderI } from '../src/interfaces/Sender';
module.exports = (sequelize: any, DataTypes: any) => {
  class Sender extends Model<SenderI> implements SenderI {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    role!: string;
    firstName!: string;
    lastName!: string;
    UserId!: number

    static associate(models: any) {
      // define association here
      Sender.hasMany(models.Message, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Sender.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Sender',
  });
  return Sender;
};