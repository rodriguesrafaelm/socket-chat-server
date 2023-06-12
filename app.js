const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {cors: {
    origin: "localhost"
  }});

let inMemoryMessages = [];
const serverPort = 4000;

io.on('connection', (socket) => {
  socket.emit('previousMessages', inMemoryMessages);
  console.log('Uma conexão foi estabelecida');
  let timer;
  const expirationTime = 2* 60 * 1000; // tempo em ms
  const resetTimer = () => {
    clearTimeout(timer); // Resetar o timer antigo pra criar um novo em seguida.
    timer = setTimeout(() => {
      socket.disconnect();
      console.log('Cliente desconectado por tempo de inatividade.');
    }, expirationTime);
  };
  socket.on('message', (content) => {
    inMemoryMessages.push(content);
    io.emit('message', inMemoryMessages);

    resetTimer(); // Reiniciar o timer pra não tomar dc
});
  
  socket.on('disconnect', () => { // Avisar quando o usário sair
    console.log("Um usuário saiu.")
  })

    resetTimer(); // Iniciar o timer assim que a conexão for estabelecida.
});



const server = http.listen(serverPort, () => {
    console.log('Servidor executando na porta ', serverPort);
  });