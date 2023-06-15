import { Server} from 'socket.io';
import { handleConnection } from '../socket/handlers/handlers';
import http from 'http';

export const configureSocket = (server: http.Server): Server => {
  const ioOptions = {
    cors: {
      origin: process.env.SERVERURL,
    },
  };
  const io: Server = new Server(server, ioOptions);
  io.on('connection', handleConnection);
  return io;
};