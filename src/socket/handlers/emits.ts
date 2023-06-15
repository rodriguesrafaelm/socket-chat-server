import MessageStorage from "../../data/StoredMessages";
import UsersList from "../../data/UsersList";
import { Socket } from "socket.io";
import { io } from '../../server';


export const emitPreviousMessagesSocket = (socket: Socket) => {
    const messages = MessageStorage.getAllMessages()
    socket.emit('previousMessages', messages);
  };
  
export const emitCurrentlyConnectedIO = () => {
    const connectedUsers = UsersList.getAllConnectedUsers()
    io.emit('userList', connectedUsers);
  };
  
  export const emmitUpdateMessages = () => {
    const messages = MessageStorage.getAllMessages()
    io.emit('message', messages);
  }