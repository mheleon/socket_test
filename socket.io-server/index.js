//server.js
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let i = 0;

const clients = {};

io.on('connect', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    console.log(io.sockets.adapter.rooms);
    delete clients[socket.id];
  });

  // Configuration event: send items
  socket.on('itemsData', (items) => {
    console.log('Client', socket.id, 'request items:', items);
    socket.items = items;
    clients[socket.id] = socket;
  });

  // Event: send items
  setInterval(() => {
    for (socketKey in clients) {
      const d = new Date();
      clients[socketKey].emit('itemsData', { for: clients[socketKey].id, seg: d.getSeconds(), 'msg#': i });
    };
    i++;
  }, 5000);

  // Event: broadcast
  setInterval(() => {
    io.sockets.emit('broadcast', 'This is a broadcast message!');
  }, 30000);

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
