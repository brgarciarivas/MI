exports.id = "main";
exports.modules = {

/***/ "./api/handlers/Coinbase.js":
false,

/***/ "./api/resolvers/Query.js":
false,

/***/ "./api/resolvers/index.js":
false,

/***/ "./api/schema.graphql":
false,

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar moment = __webpack_require__(/*! moment */ \"moment\");\nvar compress = __webpack_require__(/*! compression */ \"compression\");\nvar requestIp = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'request-ip'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar app = express();\n\nvar isProduction = \"development\" === 'production';\nvar port = isProduction ? process.env.PORT : 3000;\n\n\n// var settings = require('./api/config/settings');\n// app.use(settings.forceHttps);\n\napp.use(express.static(__dirname + '/public'));\n\napp.get('*', function(req, res, next) {\n\n    // Prevents an HTML response for API calls\n    if (req.path.indexOf('/api/') != -1) {\n        return next();\n    }\n\n    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {\n        res.send(text);\n    });\n});\n\napp.get('/public', function(req, res, next) {\n\n    // Prevents an HTML response for API calls\n    if (req.path.indexOf('/api/') != -1) {\n        return next();\n    }\n\n    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text) {\n        res.send(text);\n    });\n});\n\n\n// Real-time messaging web sockets\nvar server = __webpack_require__(/*! http */ \"http\").createServer(app);\nvar io = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'socket.io'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))(server);\n\nio.on('connection', function(data) {\n    console.log('connection on: ');\n});\n\n\nvar dailyChartUpdate = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './api/modules/chartData'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).dailyUpdate;\nvar dailyGithubUpdate = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './api/modules/githubData'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).dailyUpdate;\nvar livePriceUpdate = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './api/modules/chartData'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).liveUpdate;\n\nvar CronJob = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'cron'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).CronJob;\n\n// var dailyUpdates = new CronJob('00 00 19 * * 0-6', \n\n\n//     function() {\n//         dailyChartUpdate();\n//         dailyGithubUpdate();\n//     },\n//     function() {\n//         console.log('Cron Job for dailyUpdates done');\n//     },\n//     true,\n//     'America/New_York'\n// );\n\n// var liveUpdate = new CronJob('*/10 * * * * *',\n\n    \n//     function() {\n//         var params = {};\n//         params.io = io;\n//         livePriceUpdate(params);\n//     },\n//     function() {\n//         //\n//     },\n//     true,\n//     'America/New_York'\n// );\n\n//Make Sure CronJob is working \n// console.log('dailyUpdate cron status', dailyUpdates.running); \n// console.log('liveUpdate cron status', liveUpdate.running);\n\n\n// Networking Middleware\napp.use(bodyParser.json({ strict: false }));\napp.use(bodyParser.urlencoded({ extended: true }));\n\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar whitelist = [\n    'http://localhost:8080',\n    'http://localhost:3000',\n    'https://setfin.herokuapp.com',\n    'http://setfin.herokuapp.com/',\n    'http://setcoins.com',\n    'https://setcoins.com',\n    'http://www.setcoins.com',\n    'https://www.setcoins.com',\n    'http://setcoins-dev.herokuapp.com/',\n    'https://setcoins-dev.herokuapp.com/'\n];\nvar corsOptions = {\n    origin: function(origin, callback) {\n        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;\n        callback(null, originIsWhitelisted);\n    },\n    credentials: true,\n    methods: ['GET,PUT,POST,DELETE,OPTIONS'],\n    allowedHeaders: ['Access-Control-Allow-Headers', 'Origin', 'Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control']\n};\napp.use(cors(corsOptions));\n\n// Cookie Authentication configuration\nvar cookieSession = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'cookie-session'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nvar cookieParser = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'cookie-parser'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\napp.set('trust proxy', 1);\napp.use(cookieParser());\napp.use(cookieSession({\n    name: 'session',\n    keys: ['user'],\n    expires: moment().add(120, 'days').toDate()\n}));\n\n// Apple webhook\nvar apple = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './api/handlers/apple'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\napp.post('/hook/apple', apple.handleWebHook);\n\n// Stripe webhook\nvar stripe = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './api/handlers/stripe'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\napp.post('/hook/stripe/subscription/updated', stripe.handleUpdatedSubscription);\n\n// GraphiQL Docs\nvar graphqlHTTP = __webpack_require__(/*! express-graphql */ \"express-graphql\");\nvar apiSchema = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module './api/schema'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\napp.use('/api/v/:vid/graph', graphqlHTTP(function(req, res) {\n    return {\n        schema: apiSchema,\n        rootValue: {\n            req: req,\n            res: res,\n            io: io\n        },\n        pretty: true,\n        graphiql: true\n    };\n}));\n\n\nserver.listen(port, function() {\n    console.log('Setcoins-API: Server running on port ' + port);\n});\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ "./src/constants/index.js":
false,

/***/ "./src/reducers/environment.js":
false,

/***/ "./src/reducers/index.js":
false,

/***/ "./src/scripts/api.js":
false,

/***/ "./src/store/configureStore.development.js":
false,

/***/ "./src/store/index.js":
false,

/***/ "apollo-datasource-rest":
false,

/***/ "apollo-server-express":
false,

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-graphql\");\n\n//# sourceURL=webpack:///external_%22express-graphql%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
false,

/***/ "react-dom/server":
false,

/***/ "react-redux":
false,

/***/ "react-router-dom":
false,

/***/ "redux":
false,

/***/ "redux-thunk":
false

};