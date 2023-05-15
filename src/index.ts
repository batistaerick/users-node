import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const app = express()
  .use(compression())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(
    cors({
      credentials: true,
    })
  );

const server = http.createServer(app);

server.listen(8080, () =>
  console.log('Server running on http://localhost:8080/')
);

const MONGO_URL = 'mongodb://localhost:27017/backend';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));
