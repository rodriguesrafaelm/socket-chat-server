import express from 'express'
import { handleConnection } from "./handlers/handlers";
import { Server } from 'socket.io';
const app = express();
const http = require('http').createServer(app);

const corsOptions = {
    origin: "localhost"
  }
const serverPort = 4000;
export const io = new Server(http, {cors: corsOptions});

io.on('connection', handleConnection);

export const server = (callback: any) => {
    http.listen(serverPort, () => {
        console.log('Servidor executando na porta ', serverPort);
        if(callback){
        callback()
        }
    })
}