'use strict';
import {
  Model
} from 'sequelize';
import { MessageI } from '../src/interfaces/Message';
module.exports = (sequelize: any, DataTypes: any) => {
  class Message extends Model<MessageI> implements MessageI {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    content!: string;

    static associate(models: any) {
      // define association here
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