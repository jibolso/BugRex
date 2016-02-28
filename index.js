var Hapi = require('hapi');
var server = new Hapi.Server();

const port = 8080;

server.connection({
	port: process.env.PORT || port
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

