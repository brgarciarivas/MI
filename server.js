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

io.on('connection', function(data) {
    console.log('connection on: ');
});


var dailyChartUpdate = require('./api/modules/chartData').dailyUpdate;
var dailyGithubUpdate = require('./api/modules/githubData').dailyUpdate;
var livePriceUpdate = require('./api/modules/chartData').liveUpdate;

var CronJob = require('cron').CronJob;

// var dailyUpdates = new CronJob('00 00 19 * * 0-6', 


//     function() {
//         dailyChartUpdate();
//         dailyGithubUpdate();
//     },
//     function() {
//         console.log('Cron Job for dailyUpdates done');
//     },
//     true,
//     'America/New_York'
// );

// var liveUpdate = new CronJob('*/10 * * * * *',

    
//     function() {
//         var params = {};
//         params.io = io;
//         livePriceUpdate(params);
//     },
//     function() {
//         //
//     },
//     true,
//     'America/New_York'
// );

//Make Sure CronJob is working 
// console.log('dailyUpdate cron status', dailyUpdates.running); 
// console.log('liveUpdate cron status', liveUpdate.running);


// Networking Middleware
app.use(bodyParser.json({ strict: false }));
app.use(bodyParser.urlencoded({ extended: true }));


var cors = require('cors');

var whitelist = [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://setfin.herokuapp.com',
    'http://setfin.herokuapp.com/',
    'http://setcoins.com',
    'https://setcoins.com',
    'http://www.setcoins.com',
    'https://www.setcoins.com',
    'http://setcoins-dev.herokuapp.com/',
    'https://setcoins-dev.herokuapp.com/'
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

// Apple webhook
var apple = require('./api/handlers/apple');
app.post('/hook/apple', apple.handleWebHook);

// Stripe webhook
var stripe = require('./api/handlers/stripe');
app.post('/hook/stripe/subscription/updated', stripe.handleUpdatedSubscription);

// GraphiQL Docs
var graphqlHTTP = require('express-graphql');
var apiSchema = require('./api/schema');

app.use('/api/v/:vid/graph', graphqlHTTP(function(req, res) {
    return {
        schema: apiSchema,
        rootValue: {
            req: req,
            res: res,
            io: io
        },
        pretty: true,
        graphiql: true
    };
}));


server.listen(port, function() {
    console.log('Setcoins-API: Server running on port ' + port);
});