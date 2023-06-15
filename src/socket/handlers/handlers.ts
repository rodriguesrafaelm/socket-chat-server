import { Socket } from 'socket.io';
import UsersList from "../../data/UsersList";
import { resetTimer } from './timer';
import MessageStorage from '../../data/StoredMessages';
import {emitCurrentlyConnectedIO, emitPreviousMessagesSocket, emmitUpdateMessages} from './emits'
import { Message } from '../../interfaces/Message';
import { ConnectedUser } from '../../interfaces/ConnectedUser';
import { addSocketEvents } from '../events/events';

export const handleConnection = (socket: Socket) => {
  const username = socket.handshake.query.username as string;
  const connectedUser: ConnectedUser = {
    id: socket.id,
    username: username
  };
  console.log('Uma conexão foi estabelecida');
  let timer: any;
  timer = resetTimer(socket, timer);
  UsersList.addNewUser(connectedUser);
  emitPreviousMessagesSocket(socket);
  emitCurrentlyConnectedIO();
  addSocketEvents(socket, timer);
};

export const handleMessage = (content: Message) => {
  MessageStorage.pushNewMessage(content);
  emmitUpdateMessages();
};

export const handleDisconnect = (socket: Socket) => () => {
  UsersList.removeUserBySocketId(socket.id);
  emitCurrentlyConnectedIO();
  console.log('Um usuário saiu.');
  const userLeaving = socket.handshake.query.username as string;
  const content = { username: "System", message: `${userLeaving} saiu` };
  MessageStorage.pushNewMessage(content);
  emmitUpdateMessages();
  socket.disconnect();
};