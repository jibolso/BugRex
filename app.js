const Hapi = require('hapi');
const server = new Hapi.Server();
const inert = require('inert');
const bell    = require('bell');
const hapiAuthCookie  = require('hapi-auth-cookie');
const index = './public/index.html';
const bundle = './public/bundle.js';
const css   = './public/css/application.css';
const port = 8080;
const intert = require('inert');

if (process.env.ISPRODUCTION === undefined) {
    var config  = require('./config');
}

server.connection({
	port: process.env.PORT || port
});

server.register([inert, bell, hapiAuthCookie], (err) => {

    if (err) {
        throw err;
    }

    var authCookieOptions = {
        password: process.env.COOKIEPASSWORD || config.cookiePassword, //Password used for encryption
        cookie: 'auth', // Name of cookie to set
        isSecure: false
    };

    var facebookOptions = {
        provider: 'facebook',
        password: 'somerandompassword',
        //password: process.env.GITHUB_PASSWORD || config.password, //Password used for encryption
        //clientId: process.env.CLIENTID || config.clientId, //'YourAppId',
        //clientSecret: process.env.CLIENTSECRET || config.clientSecret,//'YourAppSecret',
        clientId: '1684806715119958',
        clientSecret: '2b175f8951cb59b392d2243b09c9656e',
        isSecure: false,
        //location: process.env.LOCATION || 'http://localhost:8080'
        location: server.info.uri

    };

    server.auth.strategy('bugrex-cookie', 'cookie', authCookieOptions);
    server.auth.strategy('facebook', 'bell', facebookOptions);

	server.route([
	    {
            method: "GET",
            path: "/bundle.js",
            handler: function(request, reply){
                reply.file(bundle);
            }
        },
        {
            method: '*',
            path: '/login',
            config: {
                auth: {
                    strategy: 'facebook',
                    mode: 'try'
                },
                handler: function (request, reply) {
                    console.log('LOGIN');
                    if (!request.auth.isAuthenticated) {
                        return reply('Authentication failed due to: ' + request.auth.error.message);
                    }
                    reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
                }
            }
        },
	    {
            method: "GET",
            path: "/css/application.css",
            handler: function(request, reply){
                reply.file(css);
            }
        },
        {
	        method: "GET",
	        path: "/",
	        handler: function(request, reply){
                console.log('home!!!')
	        	reply.file(index);
	        }
	    },
	    {
            method: "GET",
            path: "/{param}",
            handler: function(request, reply){
                reply.file(index);
            }
        }
	]);

	server.start(function(){
	    console.log(`YO Server running at port ${port}`);
        console.log('server.info.uri: ', server.info.uri);
	});

});
