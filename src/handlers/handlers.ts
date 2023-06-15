import { Socket } from 'socket.io';
import { Message } from '../interfaces/Message';
import { connectedUsers, addNewUser, ConnectedUser, updateUsersList } from '../data/usersList';
import { resetTimer } from './timer';
import { io } from '../server';
import { inMemoryMessages, pushNewMessage } from '../data/storedMessages';


const emitPreviousMessagesSocket = (socket: Socket) => {
  socket.emit('previousMessages', inMemoryMessages);
};

const emitCurrentlyConnectedIO = () => {
  io.emit('userList', connectedUsers);
};

export const handleConnection = (socket: Socket) => {
  console.log('Uma conexão foi estabelecida');
  let timer: any;
  timer = resetTimer(socket, timer);
  const username = socket.handshake.query.username as string;
  const connectedUser: ConnectedUser = {
    id: socket.id,
    username: username
  };
  addNewUser(connectedUser);
  emitPreviousMessagesSocket(socket);
  emitCurrentlyConnectedIO();
  console.log("usuários conectados", connectedUsers);
  socket.on('message', (content: Message) => {
    handleMessage(content);
    timer = resetTimer(socket, timer);
  });
  socket.on('disconnect', handleDisconnect(socket));
};

export const handleMessage = (content: Message) => {
  pushNewMessage(content)
  io.emit('message', inMemoryMessages);
};

export const handleDisconnect = (socket: Socket) => () => {
  console.log('Um usuário saiu.');
  const newUsersList = connectedUsers.filter((user) => user.id !== socket.id);
  updateUsersList(newUsersList);
  emitCurrentlyConnectedIO();
  socket.disconnect();
};