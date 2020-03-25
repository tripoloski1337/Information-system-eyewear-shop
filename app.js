var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var expressValidator = require('express-validator');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");

var indexRouter = require('./routes/index');
var dataFrameRouter = require("./routes/data_frame");
var dataLensaRouter = require("./routes/data_lensa");
var transaksiRouter = require("./routes/transaksi");
var laporanRouter = require("./routes/laporan");
var statusRouter = require("./routes/status");
var adminRouter = require("./routes/admin");
var logoutRouter = require("./routes/logout");

var app = express();
var http = require('http'); //.Server(app);
var PORT = 8000;
var server = http.createServer(app);

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.json());
//app.use(express.urlencoded());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
//app.use(session({secret:"rahasia123"}));
app.use(session({secret:"rahasia123"}));
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body == 'object' && '_method' in req.body)
    {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));



app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/data_lensa',dataLensaRouter);
app.use('/data_frame',dataFrameRouter);
app.use('/transaksi' , transaksiRouter);
app.use('/laporan' , laporanRouter);
app.use('/status' , statusRouter);
app.use("/login", adminRouter);
app.use("/logout" , logoutRouter);


var connectionString = 'mongodb://root@localhost/si_kacamata';
var options          = {server : { socketOptions: { keepAlive: 1 }}};
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, options);
console.log("[+] mongodb connected");


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

server.listen(PORT, function(){
  console.log('[+] listen di port : ' + PORT);
});


module.exports = app;