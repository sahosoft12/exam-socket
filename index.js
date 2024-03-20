//index.js
const app = require('express')();
const httpServer = require('http').createServer(app);
const {
  connectUsers,
  getUserByUserId,
  removeSocketId,
  setData,
  getData
} = require('./userlist')
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log("a user connected", socket.id);
  // Listen for a custom event "privateMessage"
  socket.on('connectUsers', (data) => {
    const user = connectUsers(data);
    io.emit('connectUsers', user);
  });
  socket.on('getConnectUser', (userid) => {
    const user = getUserByUserId(userid);
    io.emit('getConnectUser', user);

  })
  socket.on('setData', (data) => {
    setData(data);
    console.log(data);
    io.to(data.socketId).emit('setData', {
      socketId: data.socketId,
      message: data.message,
      distance: data.distance,
      userId: data.userId
    });
  });

//   socket.on('getDataByUserId', (userid)=>{

    
//     const user = getUserByUserId(userid);
//     const data = getData(userid);
// console.log(user);
// console.log(data);
//     io.to(data.socketId).emit('getDataByUserId', {
//       socketId: data.socketId,
//       message: data.message,
//       distance: data.distance,
//       userId: data.userId
//     });
//   })


  // Disconnect event
  socket.on('disconnect', () => {
    removeSocketId(socket.id);
    console.log('User disconnected: ' + socket.id);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
