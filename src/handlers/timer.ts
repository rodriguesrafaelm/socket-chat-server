import { Socket } from "socket.io";

export const resetTimer = (socket: Socket, timer: NodeJS.Timeout) => {
    const connectionExpirationTime = 5 * 60 * 1000; // tempo em ms
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit('timeoutError')
      socket.disconnect();
      console.log('Cliente desconectado por tempo de inatividade')
    }, connectionExpirationTime)
  } 