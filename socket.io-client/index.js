// client.js
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000', { reconnect: true });

let items = 'ABC';

// Add a connect listener
socket.on('connect', (socketObj) => {
  console.log('Connected');
  // Send items request
  socket.emit('itemsData', 'ABC');
});

// Add a itemsData listener
socket.on('itemsData', (data) =>{
  console.log(data);
});

// Add a broadcast listener
socket.on('broadcast', (data) =>{
  console.log(data);
});

// Add a notifications listener
socket.on('notification', (data) =>{
  console.log(data);
});

// socket.on('disconnect', function(){});
