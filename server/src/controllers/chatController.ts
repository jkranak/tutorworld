import Models from '../../models';
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { content, RoomId, SenderId } = req.body;
    const message = await Models.Message.create({SenderId, content, RoomId});
    res.send(message);
    res.status(200);
  } catch (error) {
    console.log(error)
    res.send(error);
    res.status(500);
  }
}

export const connectToRoom = async (req: Request, res: Response) => {
  try {
    const { mySenderId, otherUserSenderId } = req.body;
    // looking for a room that contains both users
    const existentRoom = await Models.sequelize.query(`SELECT Room."RoomId" FROM public."room_senders" AS Room WHERE 
    EXISTS (SELECT * FROM public."room_senders" as RS WHERE Room."RoomId" = RS."RoomId" AND "SenderId" = ${mySenderId}) AND
    EXISTS (SELECT * FROM public."room_senders" as RS WHERE Room."RoomId" = RS."RoomId" AND "SenderId" = ${otherUserSenderId}) GROUP BY Room."RoomId"`)
    if (existentRoom[0].length) {
      // room already exists so connect to it
      const room = existentRoom[0][0].RoomId;
      const senders = await Models.sequelize.query(`SELECT * FROM "Rooms"
      INNER JOIN
       room_senders ON room_senders."RoomId" = "Rooms".id
      where 
      "Rooms".id = '${room.RoomId}';`, {type: QueryTypes.SELECT, raw: true});
      console.log('result', {room, senders})
      res.send({room, senders});
    } else {
      // creating a new room and adding both senders
      const newRoom = await Models.Room.create({id: uuidv4()});
      await newRoom.addSender(mySenderId);
      await newRoom.addSender(otherUserSenderId);
      const senders = await Models.sequelize.query(`SELECT * FROM "Rooms"
      INNER JOIN
       room_senders ON room_senders."RoomId" = "Rooms".id
      where 
      "Rooms".id = '${newRoom.id}';`, {type: QueryTypes.SELECT, raw: true});

      res.send({room: newRoom.id, senders});
    }
    res.status(200);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const retrieveUserRooms = async (req: Request, res: Response) => {
  try {
    // retrieve all rooms that contain messages
    const { id, role } = req.body.user;
    // get user sender Id
    const sender = await Models.Sender.findOne({where: {UserId: id, role}});
    // get all rooms from that sender
    // TO-DO filter if the room has messages, if not then do not pass it to front end
    // TO-DO convert into sequelize query
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
    res.send(result);
    res.status(200);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const retrieveMessagesByRoom = async (req: Request, res: Response) => {
  try {
    const { RoomId } = req.params;
    const messages = await Models.Message.findAll({where: { RoomId }});
    res.send(messages);
    res.status(200);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const retrieveSenderId = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.params
    const sender = await Models.Sender.findOne({where: {UserId: id, role}});
    res.send({SenderId: sender.id});
    res.status(200);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}