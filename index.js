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

  socket.on('CLIENT_CREATE_NEW_ROOM', function (data  ) {
    if(mangRoom.indexOf(data) == -1){
      socket.emit('SERVER_CONFIRM_ROOM_NAME', true);
      mangRoom.unshift(data);
    } else {
      socket.emit('SERVER_CONFIRM_ROOM_NAME', false);
    }
  });


});
