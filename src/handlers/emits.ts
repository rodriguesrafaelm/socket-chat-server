import MessageStorage from "../data/storedMessages";
import { connectedUsers } from "../data/usersList";
import { Socket } from "socket.io";
import { io } from '../server';


export const emitPreviousMessagesSocket = (socket: Socket) => {
    const messages = MessageStorage.getMessages()
    socket.emit('previousMessages', messages);
  };
  
export const emitCurrentlyConnectedIO = () => {
    io.emit('userList', connectedUsers);
  };
  
  export const emmitUpdateMessages = () => {
    const messages = MessageStorage.getMessages()
    io.emit('message', messages);
  }