import { Socket } from 'socket.io';
import { handleMessage, handleDisconnect } from "../handlers/handlers";
import { resetTimer } from "../handlers/timer";
import { Message } from "../../interfaces/Message";

export const addSocketEvents = (socket: Socket, timer: any) => {
    socket.on('message', (content: Message) => {
      handleMessage(content);
      timer = resetTimer(socket, timer);
    });
    socket.on('disconnect', handleDisconnect(socket));
  }