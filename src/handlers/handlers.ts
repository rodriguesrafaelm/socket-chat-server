import { Socket, Server } from 'socket.io';
import {Message} from '../interfaces/Message'
import {resetTimer} from './timer'

let inMemoryMessages: Message[] = []


export const handleConnection = (io: Server) => (socket: Socket) => {
  socket.emit('previousMessages', inMemoryMessages);
  console.log('Uma conexão foi estabelecida');
  let timer = setTimeout(() => {}, 0);

  socket.on('message', (content: Message) => {
    handleMessage(content, inMemoryMessages);
    io.emit('message', inMemoryMessages);
    resetTimer(socket, timer); // Reiniciar o timer para evitar a desconexão
  });

  socket.on('disconnect', handleDisconnect);

  resetTimer(socket, timer); // Iniciar o timer assim que a conexão for estabelecida.
};

export const handleMessage = (content:Message , storage: Message[]) => {
    storage.push(content)
}

export const handleDisconnect = () => {
  console.log('Um usuário saiu.')
}

