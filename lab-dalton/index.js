let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static('./public'));

const USERS = {};


io.on('connection', (socket) => {
  console.log('Joined', socket.id);
  USERS[socket.id] = {};
  USERS[socket.id].username = 'User';

  console.log(USERS[socket.id].username);
  socket.emit('set-header', {username: USERS[socket.id].username});

  io.emit('userData', USERS);

  console.log('Joined', USERS[socket.id].username);

  socket.on('disconnect', () => {
    console.log('Left', socket.id);
    delete USERS[socket.id];
  });

  socket.on('send-message', (data) => {
    data.username = USERS[socket.id].username;
    console.log('Message:', data.message);
    io.emit('receive-message', data);
  });

  socket.on('submit-username', (msg) =>{
    console.log(msg.username);
    if(msg.username === '')
      return;
    console.log(USERS);
    USERS[socket.id].username = msg.username;
    io.emit('userData', USERS);
    console.log(USERS);
  });
});

let port = 3000;
http.listen(port, () => {
  console.log('http://localhost:' + port);
});