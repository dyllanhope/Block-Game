var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var position = {
  x: 200,
  y: 200
};


io.on("connection", socket => {
  console.log(socket.id);
  socket.emit('position', position);
  socket.on('move', data => {
    switch (data) {
      case 'left':
        position.x -= 5;
        io.emit('position', position);
        break;
      case 'right':
        position.x += 5;
        io.emit('position', position);
        break;
      case 'up':
        position.y -= 5;
        io.emit('position', position);
        break;
      case 'down':
        position.y += 5;
        io.emit('position', position);
        break;
    }
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
