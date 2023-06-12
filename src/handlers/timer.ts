import { Socket } from "socket.io";

export const resetTimer = (socket: Socket, timer: NodeJS.Timeout) => {
    const connectionExpirationTime = 3 * 1000; // tempo em ms
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit('message', [{username: 'Server', message: 'Desconectado por inatividade'}])
      socket.disconnect();
      console.log('Cliente desconectado por tempo de inatividade')
    }, connectionExpirationTime)
  } 