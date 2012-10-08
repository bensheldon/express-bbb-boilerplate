var express         = require('express'),
    app             = module.exports = express.createServer(),
    routes          = require('./routes');
  
var PORT = process.env.PORT || 3000;

// Express Configuration
app.configure( function(){
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compress());
});

app.configure('production', function(){
  app.use(express.errorHandler());
  io.set('log level', 1); // reduce logging
  // Backbone routing: compilation step is included in `npm install` script
  app.use('/app', express.static(__dirname + '/public/dist/release'));
  app.use('/assets/js/libs', express.static(__dirname + '/public/dist/release'));
  app.use('/assets/css', express.static(__dirname + '/public/dist/release'));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router); // must always come after static files
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  // Backbone routing
  app.use(express.static(__dirname + '/public'));
  app.use(app.router); // must always come after static files
});

/**
 * Routing: use the `routes` array
 */
// app.get('/api/something', function(req, res) {
//   res.json(SOMETHING);
// });

// Wildcard points to index for Backbone (which handles 404s)
app.get('*', function(req, res) {
    res.render(__dirname + '/index.ejs', { layout: false} );
});

app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});