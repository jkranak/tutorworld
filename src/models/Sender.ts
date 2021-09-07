'use strict';
import {
  Model
} from 'sequelize';
import { SenderI } from '../interfaces/Sender';
module.exports = (sequelize: any, DataTypes: any) => {
  class Sender extends Model<SenderI> implements SenderI {

    id!: number;
    role!: string;
    firstName!: string;
    lastName!: string;
    UserId!: number
    imageUrl!: string

    static associate(models: any) {
      Sender.hasMany(models.Message, {
        foreignKey: {
          allowNull: false
        }
      })
      Sender.belongsToMany(models.Room, {
        through: 'room_senders',
        as: 'rooms',
        foreignKey: 'SenderId'
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
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Sender',
  });
  return Sender;
};