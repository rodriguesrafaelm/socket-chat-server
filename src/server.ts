import express, {Express} from 'express';
import "./config/config";
import {Server as HttpServerInterface} from 'node:http';
import { configureSocket } from './config/socketConfig';

const app: Express = express();
const http: HttpServerInterface = require('http').createServer(app);
const serverPort = process.env.PORT;

export const io = configureSocket(http)

export const server = () => {
    const serverInstance = http.listen(serverPort, () => {
        console.log('Servidor executando na porta', serverPort);
    })
    return serverInstance;
}