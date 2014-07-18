// Generated by CoffeeScript 1.7.1
(function() {
  var app, express, mongoose;

  express = require('express');

  app = express();

  mongoose = require('mongoose');

  mongoose.connect('mongodb://dakolech:dako222@novus.modulusmongo.net:27017/po5Vymyq');

  app.configure(function() {
    app.use(express["static"](__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.set('views', __dirname + '/public/views');
    app.set('view engine', 'jade');
    app.engine('html', require('ejs').renderFile);
  });

  require('./app/routes.js')(app);

  app.listen(8080);

  console.log("App listening on port 8080");

}).call(this);
