var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/// ///////////////////////////////////////////////
/// Roates ///
/// ///////////////////////////////////////////////
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/css/:name', function (req, res, next){
  res.sendFile(__dirname + '/public/css/' + req.params.name);
});
app.get('/i/:name', function (req, res, next){
  res.sendFile(__dirname + '/public/i/' + req.params.name);
});

app.get('/js/:name', function (req, res, next){
  res.sendFile(__dirname + '/public/js/' + req.params.name);
});

app.get('/js/vendor/:name', function (req, res, next){
  res.sendFile(__dirname + '/public/js/vendor/' + req.params.name);
});
/// ///////////////////////////////////////////////
/// End Roates ///
/// ///////////////////////////////////////////////

var server = http.listen(7777, function(){
  console.log('listening on *:7777');
});

var usersOnline = 0;
var ips = {};
var typing = {};

io.on('connection', function(socket){

  var address = socket.handshake.address;
  usersOnline++;
  if (ips.hasOwnProperty(address)) {
    ips[address]++;
  } else {
    //ips[address]++;
    ips[address] = 1;
  }

   console.log("user connected from - [" + address + "] Total: " + ips[address] );
   console.log('online:' + usersOnline);

   //io.emit('sys msg', "user connected from - [" + address + "] Total: " + ips[address]);
   io.emit('online', usersOnline);

  socket.on('disconnect', function(){
    usersOnline--;
    ips[address]--;
    console.log('user disconnected from - [' + address + '] Total: '  + ips[address] );
   console.log('online:' + usersOnline);
   //io.emit('sys msg', "user disconnected from - [" + address + "] Total: " + ips[address]);
   io.emit('online', usersOnline);

  });

  socket.on('chat message', function(msg, user){
    io.emit('chat message', user + ": " + msg);
    console.log("MESSAGE: " + user + ": " + msg);
      typing[user] = false;
      io.emit('type', typing);
  });

  socket.on('online req', function(){
    io.emit('online', usersOnline);
  });

  socket.on('name change', function(user1, user2){
    var str = user1 + " is now:  " + user2;
    io.emit('name change', str);
  });

  socket.on('force reload', function(){
    if (address == '::ffff:127.0.0.1') {
      io.emit('reload');
    }

  });

  socket.on('sendto', function(location){
    if (address == '::ffff:127.0.0.1') {
      io.emit('rel',location);
    }
  });

  socket.on('win', function(location){
    if (address == '::ffff:127.0.0.1') {
      io.emit('window',location);
    }
  });

  socket.on('clrtype', function(){
    typing = {};
  });

  socket.on('typeing', function(uname){
    if (typing[uname] != true) {
      typing[uname] = true;
      io.emit('type', typing);
    }

  });

  socket.on('stoppedtypeing', function(uname){
    if (typing[uname] != false) {
      typing[uname] = false;
      io.emit('type', typing);
    }
  });

  socket.on('status', function(active, user){
    if (active == false) {
      io.emit('sys msg', user + " is away");
    } else {
      io.emit('sys msg', user + " has returned!");
    }
  });

    socket.on('paint_circle_rb', function(color,mx,my, size){
      io.emit('paint_circle_sent_rb', color,mx,my, size);
    });

    socket.on('paint_square_sb', function(color,mx,my, size,size){
      io.emit('paint_square_sent_sb', color,mx,my, size,size);
    });

    socket.on('paint_clouds', function(color,mx,my, size){
      io.emit('paint_clouds_sent', color,mx,my, size);
    });

    socket.on('paint_blur', function(color,mx,my, size){
      io.emit('paint_blur_sent', color,mx,my, size);
    });

    socket.on('paint_eraser', function(color,mx,my, size){
      io.emit('paint_eraser_sent', color,mx,my, size);
    });

  socket.on('paint_clr', function(){
    io.emit('paint_clr_sent');
  });


    socket.on('paint_hang_clr', function(){
      io.emit('paint_hang_clr_sent');
    });




});
