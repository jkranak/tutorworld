'use strict';
import {
  Model
} from 'sequelize';
import { RoomI } from '../interfaces/Room';
module.exports = (sequelize: any, DataTypes: any) => {
  class Room extends Model<RoomI> implements RoomI {
    id!: string;

    static associate(models: any) {
      Room.hasMany(models.Message, {
        foreignKey: {
          allowNull: false
        }
      })
      Room.belongsToMany(models.Sender, {
        through: 'room_senders',
        as: 'senders',
        foreignKey: 'RoomId'
      });
    }
  };
  Room.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
