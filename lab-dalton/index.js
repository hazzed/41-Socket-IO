let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static('./public'));

io.on('connection', (socket) => {
  console.log('Joined', socket.id);

  socket.on('disconnect', () => {
    console.log('Left', socket.id);
  });

  socket.on('send-message', (data) => {
    console.log('Message:', data.message);
    io.emit('receive-message', data);
  });
});

let port = 3000;
http.listen(port, () => {
  console.log('http://localhost:' + port);
});