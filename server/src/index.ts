// import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/router';
import db from '../models';
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;

app.use(cors());// allows server to interact with the client side
app.use(express.json());// parses(analyzing) incoming requests with JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

(() =>{
  app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
  });
  db.sequelize.sync({alter:true}).then(()=>{
    console.log('Database Connected');
  });
})();