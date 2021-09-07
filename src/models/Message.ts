'use strict';
import {
  Model
} from 'sequelize';
import { MessageI } from '../interfaces/Message';
module.exports = (sequelize: any, DataTypes: any) => {
  class Message extends Model<MessageI> implements MessageI {
    id!: number;
    content!: string;

    static associate(models: any) {
      Message.belongsTo(models.Sender);
      Message.belongsTo(models.Room);
    }
  };
  Message.init({
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};