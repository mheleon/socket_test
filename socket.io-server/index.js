/* eslint-disable no-console */

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cache = require('./cache.json');

const DELAY = 5000;

const clients = {};

io.on('connect', (socket) => {
  console.log('New client connected in socket', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected from socket', socket.id);
    console.log(io.sockets.adapter.rooms);
    delete clients[socket.id];
  });

  // Configuration event: send items
  socket.on('itemsData', (items) => {
    console.log('Client', socket.id, 'requests items:', items);
    socket.items = items;
    clients[socket.id] = socket;
  });

  // Modify list of items of the client
  socket.on('modifyItemsRequested', (itemsMod) => {
    itemsMod.forEach((item) => {
      const index = clients[socket.id].items.indexOf(itemsMod[item]);
      if (index > -1) {
        clients[socket.id].items.splice(index, 1);
      } else {
        clients[socket.id].items.push(itemsMod[item]);
      }
    });
    console.log('Client', socket.id, 'modifies items requested:', clients[socket.id].items);
  });
});

// Event: send items
setInterval(() => {
  Object.keys(clients).forEach((socketKey) => {
    const socket = clients[socketKey];
    const data = {};
    Object.keys(socket.items).forEach((key) => {
      data[socket.items[key]] = (cache[socket.items[key]]);
    });
    socket.emit('itemsData', { for: socket.id, itemsData: data });
  });
}, DELAY);

// Event: broadcast
setInterval(() => {
  io.sockets.emit('broadcast', 'This is a broadcast message!');
}, 30000);

http.listen(3000, () => {
  console.log('listening on *:3000');
});
