var express = require('express');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var compress = require('compression');
var requestIp = require('request-ip');
var bodyParser = require('body-parser');
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;


// var settings = require('./api/config/settings');
// app.use(settings.forceHttps);

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res, next) {

    // Prevents an HTML response for API calls
    if (req.path.indexOf('/api/') != -1) {
        return next();
    }

    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {
        res.send(text);
    });
});

app.get('/public', function(req, res, next) {

    // Prevents an HTML response for API calls
    if (req.path.indexOf('/api/') != -1) {
        return next();
    }

    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {
        res.send(text);
    });
});


// Real-time messaging web sockets
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('connected');

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);

    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });
});




// Networking Middleware
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));


var cors = require('cors');

var whitelist = [
    'http://localhost:8080',
    'http://localhost:3000',
];
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true,
    methods: ['GET,PUT,POST,DELETE,OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Origin', 'Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control']
};
app.use(cors(corsOptions));

// Cookie Authentication configuration
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['user'],
    expires: moment().add(120, 'days').toDate()
}));


// GraphiQL Docs
// var graphqlHTTP = require('express-graphql');
// var apiSchema = require('./api/schema');

// app.use('/api/v/:vid/graph', graphqlHTTP(function(req, res) {
//     return {
//         schema: apiSchema,
//         rootValue: {
//             req: req,
//             res: res,
//             io: io
//         },
//         pretty: true,
//         graphiql: true
//     };
// }));


server.listen(port, '0.0.0.0', function() {
    console.log('Setcoins-API: Server running on port ' + port);
});
