var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//path module
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//use middleware
app.use(express.static(path.join(__dirname, 'includes')));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
	res.render('pages/index', { title: 'Enter Chat'});
});

app.get('/chat', function(req, res){
  res.render('pages/chat', { title: 'Welcome to Chat'});
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});