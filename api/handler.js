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
    const id = request.params.id;
    if (request.method === 'get') {
        models.getTranscriptById(id, (response) => {
            console.log('getTranscript: ', response);
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
            console.log('new transcript: ', response);
            reply(response);
        });
    } else if (request.method === 'delete') {
        models.deleteTranscriptById(id, response => {
            reply(response);
        });
    }
}

const getTranscriptByTitle = (request, reply) => {
    const transcriptTitle = request.params.transcriptTitle.split('-').join(' ');
    models.getTranscriptByTitle(transcriptTitle, response => {
        reply(response);
    });
}

const getTranscriptsByUsername = (request, reply) => {
    const username = request.params.username;
    models.getTranscriptsByUsername(username, response => {
        reply(response);
    })
}

const bulk = (request, reply) => {
    // for bulk updating titles
    //models.bulk(request, reply);
}

const getUser = (request, reply) => {
    if (request.auth.isAuthenticated) {
        const username = request.auth.credentials.username;
        if (request.method === 'put') {
            const description = request.payload.description;
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
    bulk: bulk,
	featuredUsers: featuredUsers,
    githubLogin: githubLogin,
    getTranscript: getTranscript,
    getTranscriptByTitle: getTranscriptByTitle,
    getTranscriptsByUsername: getTranscriptsByUsername,
    getUser: getUser,
    getPublicUser: getPublicUser,
    logout: logout,
    saveTranscript: saveTranscript 
};

