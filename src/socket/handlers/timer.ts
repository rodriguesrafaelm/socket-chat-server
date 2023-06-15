import { Socket } from "socket.io";

export const resetTimer = (socket: Socket, timer: NodeJS.Timeout) => {
    clearTimeout(timer);
    const connectionExpirationTime = 5 * 60 * 1000; // tempo em ms
    return setTimeout(() => {
      socket.emit('timeoutError')
      socket.disconnect();
      console.log(`Cliente com o id: ${socket.id} foi desconectado por tempo de inatividade`)
    
    }, connectionExpirationTime)
  } 