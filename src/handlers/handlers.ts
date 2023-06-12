import { Socket } from 'socket.io';
import { Message } from '../interfaces/Message';
import { resetTimer } from './timer';
import { io } from '../server';

export interface ConnectedUser {
  id: string;
  username: string;
}

let inMemoryMessages: Message[] = [];
let connectedUsers: ConnectedUser[] = [];

const previouslyStoredMessages = (socket: Socket) => {
  socket.emit('previousMessages', inMemoryMessages);
};

const emitCurrentlyConnected = () => {
  io.emit('userList', connectedUsers);
};

export const handleConnection = (socket: Socket) => {
  previouslyStoredMessages(socket);
  console.log('Uma conexão foi estabelecida');
  
  let timer = setTimeout(() => {}, 0);
  const username = socket.handshake.query.username as string;
  
  const connectedUser: ConnectedUser = {
    id: socket.id,
    username: username, // Defina o nome de usuário apropriado
  };
  
  connectedUsers.push(connectedUser);
  emitCurrentlyConnected();
  console.log(connectedUsers);
  
  socket.on('message', (content: Message) => {
    handleMessage(content, inMemoryMessages);
    io.emit('message', inMemoryMessages);
    resetTimer(socket, timer); // Reiniciar o timer para evitar a desconexão
  });
  
  socket.on('disconnect', handleDisconnect(socket));
  
  resetTimer(socket, timer); // Iniciar o timer assim que a conexão for estabelecida.
};

export const handleMessage = (content: Message, messageStorage: Message[]) => {
  messageStorage.push(content);
};

export const handleDisconnect = (socket: Socket) => () => {
  console.log('Um usuário saiu.');
  connectedUsers = connectedUsers.filter((user) => user.id !== socket.id);
  emitCurrentlyConnected();
  socket.disconnect();
};