import { Socket } from 'socket.io';
import { Message } from '../interfaces/Message';
import { connectedUsers, addNewUser, ConnectedUser, updateUsersList } from '../data/usersList';
import { resetTimer } from './timer';
import { pushNewMessage } from '../data/storedMessages';
import {emitCurrentlyConnectedIO, emitPreviousMessagesSocket, emmitUpdateMessages} from './emits'

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
  emmitUpdateMessages()
};

export const handleDisconnect = (socket: Socket) => () => {
  const newUsersList = connectedUsers.filter((user) => user.id !== socket.id);
  updateUsersList(newUsersList);
  emitCurrentlyConnectedIO();
  console.log('Um usuário saiu.');
  const userLeaving = socket.handshake.query.username as string;
  const content = { username: "System", message: `${userLeaving} saiu` }
  pushNewMessage(content);
  emmitUpdateMessages()
  socket.disconnect();
};