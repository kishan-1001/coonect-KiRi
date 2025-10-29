const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const locationSocket = require('./sockets/locationSocket');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Initialize location socket
locationSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
