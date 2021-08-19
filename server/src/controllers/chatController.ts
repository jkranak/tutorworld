import Models from '../../models';
import { Request, Response } from 'express';

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
    const rooms = await Models.Room.findAll({
      include: [{
          model: Models.Sender,
          as: 'senders',
          attributes: [],
          through: {where: {SenderId: sender.id}}
      }]
    });
    
    // const senderTwo = await Models.Sender.findAll({
    //   include: [{
    //     model: Models.Room,
    //     as: 'rooms',
    //     attributes: [],
    //     through: {where: {SenderId: sender.id}}
    //   }]
    // })

    res.send(rooms);
    res.status(200);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }
}

