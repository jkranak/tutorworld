import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/router';
import db from '../models';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());// allows server to interact with the client side
app.use(express.json());// parses(analyzing) incoming requests with JSON
app.use(express.urlencoded({ extended: true }));

app.use(router);

(async () =>{
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
  await db.sequelize.authenticate();
  console.log('Database Connected');
})();