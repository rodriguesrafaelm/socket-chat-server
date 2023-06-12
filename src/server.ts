import express from 'express'
import { handleConnection } from "./handlers/handlers";

const app = express();
const http = require('http').createServer(app);

const corsOptions = {
    origin: "localhost"
  }
const serverPort = 4000;
export const io = require('socket.io')(http, {cors: corsOptions});

io.on('connection', handleConnection);

http.listen(serverPort, () => {
    console.log('Servidor executando na porta ', serverPort);
  });