import express from 'express';
import cors from 'cors';
import router from './routes/router';
import db from '../models';
require('dotenv').config();
const PORT = process.env.PORT || 5000;
import { Socket } from 'socket.io';
const socket = require('socket.io');
const app = express();

  app.use(cors());// allows server to interact with the client side
  app.use(express.json());// parses(analyzing) incoming requests with JSON
  app.use(express.urlencoded({ extended: true }));
  
  app.use(router);

  const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  
  (() => {
    db.sequelize.sync({alter: true}).then(() => console.log('Database Connected'));
  })()


  const io = socket(server);

  io.on('connection', (socket: Socket) => {
  console.log('socket id', socket.id)

  socket.on('join_room', (room) => {
    // in this case data is the room
    socket.join(room);
    console.log(`user joined room: ${room}`)
  })

  socket.on('send_message', (message) => {
    // send message to room and emit to people listening to this room
    console.log(`sending ${message.content} to room ${message.RoomId}`)
    socket.to(message.RoomId).emit('receive_message', message);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  
})