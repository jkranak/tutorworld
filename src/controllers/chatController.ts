import Models from '../models';
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { content, RoomId, SenderId } = req.body;
    const message = await Models.Message.create({SenderId, content, RoomId});
    res.status(200).send(message);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const connectToRoom = async (req: Request, res: Response) => {
  try {  
    const { mySenderId, otherUserSenderId } = req.body;
    console.log('mysenderid', mySenderId)
    console.log('othersenderid', otherUserSenderId)
    const existentRoom = await Models.sequelize.query(`SELECT Room."RoomId" FROM public."room_senders" AS Room WHERE 
    EXISTS (SELECT * FROM public."room_senders" as RS WHERE Room."RoomId" = RS."RoomId" AND "SenderId" = ${mySenderId}) AND
    EXISTS (SELECT * FROM public."room_senders" as RS WHERE Room."RoomId" = RS."RoomId" AND "SenderId" = ${otherUserSenderId}) GROUP BY Room."RoomId"`)
    if (existentRoom[0].length) {
      const room = existentRoom[0][0].RoomId;
      const senders = await Models.sequelize.query(`SELECT * FROM "Rooms"
      INNER JOIN
       room_senders ON room_senders."RoomId" = "Rooms".id
      where 
      "Rooms".id = '${room}';`, {type: QueryTypes.SELECT, raw: true});
      res.status(200);
      res.send({room, senders});
    } else {
      const newRoom = await Models.Room.create({id: uuidv4()});
      await newRoom.addSender(mySenderId);
      await newRoom.addSender(otherUserSenderId);
      const senders = await Models.sequelize.query(`SELECT * FROM "Rooms"
      INNER JOIN
       room_senders ON room_senders."RoomId" = "Rooms".id
      where
      "Rooms".id = '${newRoom.id}';`, {type: QueryTypes.SELECT, raw: true});
      res.status(200);
      res.send({room: newRoom.id, senders});
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const retrieveUserRooms = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body.user;
    const sender = await Models.Sender.findOne({where: {UserId: id, role}});
    const rooms = await Models.sequelize.query(`SELECT * FROM "Rooms"
    INNER JOIN
     room_senders ON room_senders."RoomId" = "Rooms".id
    INNER JOIN 
    "Senders" ON room_senders."SenderId" = "Senders".id
    where 
    "Senders".id = ${sender.id};`, {type: QueryTypes.SELECT, raw: true})

    let result: {}[] = [];

    await Promise.all(rooms.map(async (room: any )=> {
      let senders: any = [];

      const otherSenders = await Models.sequelize.query(`SELECT * FROM "Rooms"
      INNER JOIN
       room_senders ON room_senders."RoomId" = "Rooms".id
      where 
      "Rooms".id = '${room.RoomId}';`, {type: QueryTypes.SELECT, raw: true});

      senders = await Promise.all(otherSenders.map(async (otherSender: any) => {
        if (otherSender.SenderId !== sender.id) {
          const currentSender = await Models.Sender.findOne({where: {id: otherSender.SenderId}});
          return currentSender.toJSON();
        }
        return null
      }))
      senders = senders.filter((sender: any) => sender !== null);
      result.push({
        room: room.RoomId,
        senders
      })
    }))
    res.status(200).send(result);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const retrieveMessagesByRoom = async (req: Request, res: Response) => {
  try {
    const { RoomId } = req.params;
    const messages = await Models.Message.findAll({where: { RoomId }});
    res.status(200).send(messages);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}

export const retrieveSenderId = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.params
    const sender = await Models.Sender.findOne({where: {UserId: id, role}});
    res.status(200).send({SenderId: sender.id});
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
}