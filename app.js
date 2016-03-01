const Hapi = require('hapi');
const server = new Hapi.Server();
const inert = require('inert');
const index = './public/index.html';
const bundle = './public/bundle.js';
const port = 8080;

server.connection({
	port: process.env.PORT || port
});

server.register(require('inert'), (err) => {
	server.route([
	    {
            method: "GET",
            path: "/bundle.js",
            handler: function(request, reply){
                reply('hello world');
                //reply.file(bundle);
            }
        },{
	        method: "GET",
	        path: "/",
	        handler: function(request, reply){
	        	reply.file(index);
	        }
	    }
	]);

	server.start(function(){
	    console.log(`YO Server running at port ${port}`);
	});

});
