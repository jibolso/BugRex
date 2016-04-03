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
const handler = require('./api/handler');

if (process.env.IS_PRODUCTION === undefined) {
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
        password: process.env.COOKIE_PASSWORD || config.cookiePassword, //Password used for encryption
        cookie: 'auth', // Name of cookie to set
        isSecure: false
    };

    if (process.env.LOCATION) {
        console.log('LOCATION: ', process.env.LOCATION);
    }

    var githubOptions = {
        provider: 'github',
        password: process.env.GITHUB_PASSWORD || config.github.password, //Password used for encryption
        clientId: process.env.GITHUB_CLIENT_ID || config.github.clientId, //'YourAppId',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || config.github.clientSecret,//'YourAppSecret',
        isSecure: false,
//        location: server.info.uri
        location: process.env.LOCATION || 'http://localhost:8080'
    };

    var facebookOptions = {
        provider: 'facebook',
        password: process.env.FACEBOOK_PASSWORD || config.facebookPassword, //Password used for encryption
        clientId: process.env.CLIENT_ID || config.clientId, //'YourAppId',
        clientSecret: process.env.CLIENT_SECRET || config.clientSecret,//'YourAppSecret',
        isSecure: false,
        location: server.info.uri
    };

    server.auth.strategy('github-oauth', 'bell', githubOptions);
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
            method: 'GET',
            path: '/static/{param*}',
            handler: {
                directory: {
                    path: 'public',
                    listing: true
                }
            }
        },
        {
            method: ["GET", "POST"],
            path: "/auth/github",
            config: {
                auth: 'github-oauth',
                handler: handler.githubLogin
            }
        },
        {
            method: 'GET',
            path: '/logout',
            config: {
                auth: false,
                handler: handler.logout
            }
        },
        {
            method: "GET",
            path: "/api/users/featured",
            handler: handler.featuredUsers
        },
        {
            method: "GET",
            path: "/api/user/{username}",
            handler: handler.getPublicUser
        },
        {
            method: ["GET", "PUT"],
            path: "/api/user",
            config: {
                auth: {
                    strategy: 'bugrex-cookie',
                    mode: 'try'
                },
                handler: handler.getUser
            }
                
        },
        {
            method: ["POST"],
            path: "/api/transcript",
            config: {
                handler: handler.saveTranscript
            }     
        },
        {
            method: "GET",
            path: "/api/transcripts/{username}",
            config: {
                handler: handler.getTranscriptsByUsername
            }     
        },
        {
            method: ["GET", "PUT"],
            path: "/api/transcript/{id}",
            config: {
                handler: handler.getTranscript
            }     
        },
        {
            method: '*',
            path: '/auth/facebook',
            config: {
                auth: {
                    strategy: 'facebook',
                    mode: 'try'
                },
                handler: function (request, reply) {
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
	        config: {
                auth: {
                    strategy: 'bugrex-cookie',
                    mode: 'try'
                },
                handler: function(request, reply){
                    if (request.auth.isAuthenticated) {
                        console.log('is authenticated', request.auth.credentials);
                    }
                    reply.file(index);
                }
            }
	    },
        {
            method: "GET",
            path: "/{param*}",
            handler: function(request, reply){
                reply.file(index);
            },

        }
	]);

	server.start(function(){
	    console.log(`YO Server running at port ${port}`);
	});

});
