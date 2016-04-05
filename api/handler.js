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

const getTranscript = (request, reply) => {
    if (request.method === 'get') {
        const id = request.params.id;
        models.getTranscriptById(id, (response) => {
            
            if (response === false) {
                reply(false);
            }

            if (response.published) {
                reply(response);
            } else {
                reply(false);
            }
        });
    }
    else if (request.method === 'put') {
        const transcript = request.payload.transcript;
        models.updateTranscript(transcript, response => {
            reply(response);
        });    
    }
}

const getTranscriptsByUsername = (request, reply) => {
    const username = request.params.username;
    models.getTranscriptsByUsername(username, response => {
        reply(response);
    })
}

const getUser = (request, reply) => {
    if (request.auth.isAuthenticated) {
        const username = request.auth.credentials.username;
        if (request.method === 'put') {
            const description = request.payload.description;
/*            models.updateUserDescription(username, description, description => {
                reply({
                    description: description
                });
            });*/
            console.log('request.payload: ', request.payload);
            models.updateUser(username, request.payload, response => {
                reply(response);
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
        models.githubLogin(payload, username, (user) => {
            if (user === false) {
                reply.redirect('/');
            }
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
    getTranscript: getTranscript,
    getTranscriptsByUsername: getTranscriptsByUsername,
    getUser: getUser,
    getPublicUser: getPublicUser,
    logout: logout,
    saveTranscript: saveTranscript 
};

