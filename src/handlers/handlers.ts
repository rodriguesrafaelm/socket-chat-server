import { Socket } from 'socket.io';
import { connectedUsers, addNewUser, updateUsersList } from '../data/usersList';
import { resetTimer } from './timer';
import MessageStorage from '../data/storedMessages';
import {emitCurrentlyConnectedIO, emitPreviousMessagesSocket, emmitUpdateMessages} from './emits'

import { Message } from '../interfaces/Message';
import { ConnectedUser } from '../interfaces/ConnectedUser';

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
  console.log(content)
  MessageStorage.pushNewMessage(content)
  emmitUpdateMessages()
};

export const handleDisconnect = (socket: Socket) => () => {
  const newUsersList = connectedUsers.filter((user) => user.id !== socket.id);
  updateUsersList(newUsersList);
  emitCurrentlyConnectedIO();
  console.log('Um usuário saiu.');
  const userLeaving = socket.handshake.query.username as string;
  const content = { username: "System", message: `${userLeaving} saiu` }
  MessageStorage.pushNewMessage(content);
  emmitUpdateMessages()
  socket.disconnect();
};