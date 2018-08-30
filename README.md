# Socket io test

Server-client bidirectional and event-based communication.

## Getting started

```bash
# First clone this repo
git clone ...
cd socket_test

# Then install node dependencies
cd socket.io-server
npm install ./socket.io-server

cd socket.io-client
npm install ./socket.io-client

# Run server
cd socket.io-server
npm run start:dev

# Run client, more than one client can be started
cd socket.io-server
ITEMS_REQUESTED='[A, B, C]' node .
```
