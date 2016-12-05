var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));

server.listen(3000, function () {
  console.log('SERVER STARTED');
});

app.get('/', function (req, res) {
  res.render('home');
});

var mangRoom = [];

io.on('connection', function (socket) {
  console.log('Co nguoi ket noi');

  socket.emit('SERVER_SEND_ROOM_ARRAY', mangRoom);

  socket.on('CLIENT_CREATE_NEW_ROOM', function (data  ) {
    if(mangRoom.indexOf(data) == -1){
      socket.join(data);
      socket.emit('SERVER_CONFIRM_ROOM_NAME', data);
      socket.broadcast.emit('NEW_ROOM_ACCEPTED', data);
      mangRoom.unshift(data);
    } else {
      socket.emit('SERVER_CONFIRM_ROOM_NAME', false);
    }
  });

  socket.on('CLIENT_JOIN_ROOM', function (roomName) {
    socket.join('roomName');
  });

  socket.on('CLIENT_SEND_MESSAGE_TO_ROOM', function (data) {
    console.log(data);
    socket.broadcast.to(data.roomName).emit('ROOM_MESSAGE', data.msg);
  });

});
