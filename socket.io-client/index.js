// client.js
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000', { reconnect: true });

ITEMS_REQUESTED = process.env.ITEMS_REQUESTED;

// Add a connect listener
socket.on('connect', (socketObj) => {
  console.log('Connected');
  // Send items request
  socket.emit('itemsData', ITEMS_REQUESTED);
});

// Add a itemsData listener
socket.on('itemsData', (data) => {
  console.log(data);
});

// Add a broadcast listener
socket.on('broadcast', (data) => {
  console.log(data);
});

// Add a notifications listener
socket.on('notification', (data) => {
  console.log(data);
});

// Change items requested (simulated)
let trigger = true;
setInterval(() => {
  if (trigger) {
    // Modify all items requested
    socket.emit('itemsData', ["D", "E"]);
    // Modify just some items requested
    socket.emit('modifyItemsRequested', ["A", "E"]);
    trigger = false;
  } else {
    // Modify all items requested
    socket.emit('itemsData', ["A", "B", "C"]);
    trigger = true;
  }
}, 11000);
