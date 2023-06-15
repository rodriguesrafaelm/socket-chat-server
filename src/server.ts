import express from 'express'
import { handleConnection } from "./socket/handlers/handlers";
import { Server } from 'socket.io';
import "./config/config"
const app = express();
const http = require('http').createServer(app);


const corsOptions = {
    origin: process.env.SERVERURL
  }
const serverPort = process.env.PORT;
export const io = new Server(http, {cors: corsOptions});

io.on('connection', handleConnection);

export const server = () => {
    const serverInstance = http.listen(serverPort, () => {
        console.log('Servidor executando na porta', serverPort);
    })
    return serverInstance;
}