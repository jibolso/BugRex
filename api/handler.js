const models = require('./models');

const featuredUsers = function(request, reply){
    models.getFeaturedUsers(reply);
};

const getPublicUser = (request, reply) => {
    const username = request.params.username;
    models.getPublicUser(username, (user) => {
        reply(user);
    });
}


const getUser = (request, reply) => {
    if (request.auth.isAuthenticated) {
        const username = request.auth.credentials.username;
        
        if (request.method === 'put') {
            const description = request.payload.description;
            models.updateUserDescription(username, description, description => {
                reply({
                    description: description
                });
            });

        } else if (request.method === 'get') {
           models.getUser(username, user => {
                reply(user);
           });
        }
    } else {
        reply(false);
    }
}


const githubLogin = (request, reply) => {
    const payload = request.auth.credentials;
    if (request.auth.isAuthenticated) {
        const username = request.auth.credentials.profile.username;
        models.githubLogin(username, (user) => {
            console.log('in callback user: ', user);
            if (user === false) {
                reply.redirect('/');
            }
            console.log('setting session');
            request.auth.session.set(user);
            reply.redirect('/');
        });
    }
    else {
        return reply('Not logged in...').code(401);
    }
}

const logout = (request, reply) => {
    request.auth.session.clear();
    reply.redirect('/');
}

const saveTranscript = (request, reply) => {
    const payload = JSON.parse(request.payload.data);
    models.saveTranscript(payload, reply);
}

module.exports = {
	featuredUsers: featuredUsers,
    githubLogin: githubLogin,
    getUser: getUser,
    getPublicUser: getPublicUser,
    logout: logout,
    saveTranscript: saveTranscript 
};

