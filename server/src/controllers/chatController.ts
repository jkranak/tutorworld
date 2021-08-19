import Models from '../../models';
import { Request, Response } from 'express';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    // should receive the roomid too
    const { id, role } = req.body.user;
    const { content } = req.body;
    const sender = await Models.Sender.findOne({where: {UserId: id, role}})
    const message = await Models.Message.create({SenderId: sender.id, content, RoomId: 'testroom'});
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
    const { room } = req.body;

    const existentRoom = await Models.Room.findOne({where: {id: room}})
    if (existentRoom) {
      // room already exists so connect to it
      res.send(`Connected to: ${existentRoom.id}`);
    } else {
      const newRoom = await Models.Room.create({id: room});
      res.send(`New room created: ${newRoom.id}`);
    }
    res.status(200);
  } catch (error) {
    console.log(error)
    res.status(500);
    res.send(error);
  }

}