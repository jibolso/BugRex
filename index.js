var express = require('express');
var app = express();

var Hapi = require('hapi');
var server = new Hapi.Server();

const port = 8080;
const host = 'localhost';

server.connection({
	port: process.env.PORT || port
//    host: process.env.HOSTNAME || host
});

server.route([
    {
        method: "GET",
        path: "/",
        handler: function(request, reply){
        	reply('hello');
        }
    }
]);

server.start(function(){
    console.log(`Server running at ${host} port ${port}`);
});


/*app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/

