import express from 'express';
import cors from 'cors';
import router from './routes/router';
import db from '../models';
require('dotenv').config();
const PORT = process.env.PORT || 5000;
import { Socket } from 'socket.io';
const socket = require('socket.io');
const app = express();
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // relative path
  });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

(() => {
  db.sequelize.sync({alter: true}).then(() => console.log('Database Connected'));
})()



const io = socket(server);

io.on('connection', (socket: Socket) => {
  socket.emit("me", socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
  })

  socket.on('send_message', (message) => {
    socket.to(message.RoomId).emit('receive_message', message);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data);
  })

  socket.on("callUser", ({ userToCall, signalData, from}) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from});
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  });

  socket.on('join-room', room => {
    socket.join(room);
  })

})