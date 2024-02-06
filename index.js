//index.js
const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});
let userAns = [];
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  // Listen for a custom event "privateMessage"
  socket.on('privateMessage', (data) => {
    console.log(data);
    // console.log(`Received private message from ${data.userId}: ${data.message} : ${data.distance}`);

    // Get the socket ID of the recipient user
    const recipientSocketId = data.socketId;
    console.log(recipientSocketId);

    // Send the private message to the specific socket ID
    io.to(data.socketId).emit('privateMessage', {
      senderSocketId: data.socketId,
      message: data.message,
      distance: data.distance
    });
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
