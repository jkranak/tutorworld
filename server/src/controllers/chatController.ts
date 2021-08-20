import Models from '../../models';
import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    // should receive the roomid too
    const { id, role } = req.body.user;
    const { content, RoomId } = req.body;
    const sender = await Models.Sender.findOne({where: {UserId: id, role}})
    const message = await Models.Message.create({SenderId: sender.id, content, RoomId});
    res.status(200);
    res.send(message);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

export const connectToRoom = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body.user;
    const { room, otherUserId, otherUserRole } = req.body;

    const existentRoom = await Models.Room.findOne({where: {id: room}})
    if (existentRoom) {
      // room already exists so connect to it
      const sender = await Models.Sender.findOne({where: {UserId: id, role}});
      res.send(`Connected to: ${existentRoom.id}`);
    } else {
      // retrieving the user senderid
      const senderOne = await Models.Sender.findOne({where: {UserId: id, role}});
      // retrieving the person the user wants to chat with
      const senderTwo = await Models.Sender.findOne({where: {UserId: otherUserId, role: otherUserRole}})

      // creating a new room and adding both senders
      const newRoom = await Models.Room.create({id: room});
      await newRoom.addSender(senderOne.id);
      await newRoom.addSender(senderTwo.id);

      res.send(`New room created: ${newRoom.id}`);
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