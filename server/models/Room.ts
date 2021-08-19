'use strict';
import {
  Model
} from 'sequelize';
import { RoomI } from '../src/interfaces/Room';
module.exports = (sequelize: any, DataTypes: any) => {
  class Room extends Model<RoomI> implements RoomI {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    // user1_id!: number;
    // user2_id!: number;

    static associate(models: any) {
      // define association here
      Room.hasMany(models.Message, {
        foreignKey: {
          allowNull: false
        }
      })
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