# Projeto de Exemplo usando Socket.IO
Este é um projeto de exemplo que demonstra a implementação de um chat em tempo real usando Socket.IO. Ele foi desenvolvido com Node.js e TypeScript, e utiliza o framework Socket.IO para facilitar a comunicação bidirecional entre o servidor e os clientes.

## Funcionalidades
Os usuários podem enviar mensagens em tempo real para o servidor.
As mensagens são armazenadas na memória do servidor e enviadas para todos os clientes conectados.
Os clientes recebem as mensagens em tempo real e exibem em seus respectivos chats.
## Tecnologias Utilizadas
- Node.js
- TypeScript
- Socket.IO
- Express
## Configuração do Projeto
Clone o repositório para sua máquina local.
Execute o comando npm install para instalar as dependências.
Execute o comando npm start para iniciar o servidor.
Certifique-se de ter o Node.js e o npm instalados em seu sistema antes de executar esses comandos.


## Funcionamento

1. O servidor é iniciado e aguarda conexões dos clientes.
2. Quando um cliente se conecta ao servidor, o evento `connection` é disparado.
3. No evento `connection`, o servidor envia ao cliente as mensagens anteriores armazenadas em `inMemoryMessages`, garantindo que o cliente receba as mensagens anteriores assim que se conectar.
4. O servidor inicia um timer para remover conexões inativas. Isso é feito chamando a função `resetTimer(socket, timer)`.
5. Quando o cliente envia uma mensagem, ele dispara o evento `message`, passando o conteúdo da mensagem.
6. No servidor, a função `handleMessage` é chamada, adicionando a mensagem ao array `inMemoryMessages`.
7. O servidor emite a mensagem para todos os clientes conectados usando `io.emit('message', inMemoryMessages)`, permitindo que todos os clientes vejam a mensagem em tempo real.
8. O servidor reinicia o timer para evitar a desconexão do cliente.
9. Se o cliente se desconectar, o evento `disconnect` é disparado.
10. No evento `disconnect`, a função `handleDisconnect` é chamada, exibindo uma mensagem no console e desconectando o cliente.
11. Caso o tempo de conexão expire pelo `timer`, o usuário recebe uma mensagem do servidor avisando a desconexão.

## Recursos Adicionais

- As mensagens enviadas pelos clientes são armazenadas em memória no servidor.
- Quando um novo cliente se conecta, ele recebe as mensagens anteriores assim que se conecta.
- O servidor monitora a atividade do cliente para evitar desconexões usando um timer.

