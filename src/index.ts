import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { MONGO_URL, PORT } from '../config';
import router from './routers/index';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

const app = express()
  .use(compression())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(
    cors({
      credentials: true,
    })
  )
  .use('/', router());

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log('Server running on http://localhost:8080/')
);
