import { inMemoryMessages } from "../data/storedMessages";
import { connectedUsers } from "../data/usersList";
import { Socket } from "socket.io";
import { io } from '../server';


export const emitPreviousMessagesSocket = (socket: Socket) => {
    socket.emit('previousMessages', inMemoryMessages);
  };
  
export const emitCurrentlyConnectedIO = () => {
    io.emit('userList', connectedUsers);
  };
  
  export const emmitUpdateMessages = () => {
    io.emit('message', inMemoryMessages);
  }