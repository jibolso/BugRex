const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

mongoose.connect(process.env.MONGOLAB || config.mongolab);

const userSchema = new Schema({
    email: String,
    name: String,
    username: String,
    profileImg: String,
    completedChats: Number,
    facebookId: Number,
    uniqueId: String,
    skills: Array,
    githubUrl: String,
    description: String
});

const transcriptSchema = new Schema({
    kind: String,
    id: String,
    tags: Array,
    items: Array,
    visitor: Object,
    title: String,
    mainOperator: String,
    published: Boolean,
    operators: Object,
    group: Array
});

const Transcript = mongoose.model('Transcript', transcriptSchema);
const User = mongoose.model('User', userSchema);

const example = (reply) => {
    // block
};

const getFeaturedUsers = (reply) => {
	User.find({})
        .sort({completedChats: -1})
        .exec(function(err, users){
            
            if (err){
                throw err;
            }
            
            if (users) {
                reply(users);
            } else {
                reply(false);
            }
    });
}

const getPublicUser = (username, callback) => {
	User.findOne({ username: username }, function(err, user){
        
        if (err){
            throw err;
            callback(false);
        }
        
        if (user) {
            callback(user);
        } else {
            callback(false);
        }
    });
}

const updateTranscript = (new_transcript, callback) => {
    console.log('updateTranscript');
    Transcript.findById(new_transcript._id, (err, transcript) => {
        
        if (err){
            throw err;
            callback(false);
        }
        
        if (transcript) {
            transcript.title = new_transcript.title;
            transcript.published = new_transcript.published;
            transcript.markModified('title');
            transcript.markModified('description'); 
            transcript.save(err => {
                if (err) {
                    throw err;
                    callback(false);
                }
                callback(transcript);
            });
        } else {
            callback(false);
        }
    })
}

const getTranscriptsByUsername = (username, callback) => {
    Transcript.find({mainOperator: username}, (err, transcripts) => {
        
        if (err) {
            throw err;
            callback(false);
        }

        if (transcripts) {
            callback(transcripts.reverse());
        } else {
            callback(false);
        }
    })
}


const getTranscriptByTitle = (title, callback) => {
    Transcript.findOne({title: title}, (err, transcript) => {
        if (err) {
            throw err;
            callback(false);
        }

        if (transcript && transcript.published) {
                callback(transcript);
        } else {
            callback(false);
        }
    })
}

const getTranscriptById =  (id, callback) => {
    // uses Olark transcript Id, not mongodb id
    Transcript.findOne({id: id}, (err, transcript) => {

        if (err) {
            throw err;
            callback(false);
        }

        if (transcript) {
            callback(transcript);
        } else {
            callback(false);
        }
    });
}


const deleteTranscriptById = (id, callback) => {
    // uses Olark transcript Id, not mongodb id
    Transcript.findOneAndRemove({id: id}, (err) => {
        if (!err) {
            callback(true);
        } else {
            callback(false);
        }
    }); 
}


const getUser = (username, callback) => {
	User.findOne({ username: username }, function(err, user){
            
		if (err){
		    throw err;
			callback(false);
		}

		if (user) {
		    callback(user);
		} else {
		    callback(false);
		}
	});
}

const updateUser = (username, data, callback) => {
    User.findOneAndUpdate({username: username}, data, (err, user) => {
        callback(user);
    });
};


const githubLogin = (payload, username, callback) => {
 	User.findOne({ username: username }, function(err, user){
        
        if (err){
            throw err;
            callback(user);
        }

        if (user) {
            callback(user);
        }

        else {
            var new_user = new User();
            new_user.name = payload.profile.displayName;
            new_user.email = payload.profile.email;
            new_user.username = payload.profile.username;
            new_user.skills = [];
            new_user.profileImg = payload.profile.raw.avatar_url;
            new_user.githubUrl = payload.profile.raw.url;
            new_user.completedChats = 0;
            new_user.uniqueId = 'github_' + payload.profile.id;
            new_user.save( function(err, res) {
                if (err){
                    throw error;
                    callback(false);
                }
                callback(new_user);
            });
        }
    });
} 

const updateUserDescription = (username, description, callback) => {
	User.findOne({ username: username }, function(err, user) {
                
        if (err){
            throw err;
            callback(false);
        } 

        if (user) {
            user.description = description;
            user.markModified('description');
            user.save(function(err){
                if (err) {
                    callback(false);
                }
                callback(user.description);
            });
        } else {
            callback(false);
        }
    });    
}



const getMainOperator = (operators, chatItems) => {
    chatItems.forEach(item => {
        if (item.kind === 'MessageToVisitor') {
            operators[item.nickname] += 1;
        }
    });
    const mainOperator = Object.keys(operators).reduce(function(a, b){ return operators[a] > operators[b] ? a : b });
    return mainOperator;
}

const bulk = (request, reply) => {
    Transcript.find({}, (err, transcripts) => {
        console.log('transcripts.length', transcripts.length);
        transcripts.forEach(t => {
            Transcript.findById(t._id, (err, tr) => {
                if (err){
                    throw err;
                } else {
                    tr.title = 'Chat with ' + tr.visitor.country + ' ' + tr.id;
                    tr.markModified('title');
                    tr.save(function(err) {
                        if (err) {
                            console.log('err: ', err);
                        } else {
                            console.log('saved!');
                        }
                    });
                }
            });
        });
    });
}

const saveTranscript = (payload, reply) => {
    var operators = payload.operators;
    var operatorNames = {};
    for (var key in operators) {
        operatorNames[operators[key].nickname] = 0;
    }
    const mainOperator = getMainOperator(operatorNames, payload.items);

	Transcript.findOne({id: payload.id}, (err, transcript) => {

	    if (err){
	        throw err;
	        reply(false);
	    }

	    if (transcript) {
	        reply(false)
	    }

	    else {
	        var new_transcript = new Transcript();
	        new_transcript.kind = payload.kind;
	        new_transcript.id = payload.id;
	        new_transcript.tags = payload.tags;
            new_transcript.title = 'Chat with ' + payload.visitor.country + ' ' + payload.id;
	        new_transcript.visitor = payload.visitor;
            new_transcript.mainOperator = mainOperator;
            new_transcript.operators = payload.operators;
            new_transcript.published = false;
            new_transcript.items = payload.items;
	        new_transcript.groups = payload.groups;
	        new_transcript.save(function(err) {
	            if (err){
	                throw error;
	            }
	            addChatToUser(payload.operators, reply);
	        });
	    }
	});
}



const addChatToUser = (operatorsObject, reply) => {
    var usernames = [];
    
    for (var key in operatorsObject) {
        usernames.push(operatorsObject[key].nickname);
    }

    usernames.forEach( username => {
        User.findOne({username: username}, (err, user) => {
            if (err){
                throw err;
                reply(false);
            }

            if (user) {
                user.completedChats = user.completedChats + 1;
                user.markModified('completedChats');
                user.save((err) => {
                    reply(true);
                });
            }
        });
    });
};


module.exports = {
    bulk: bulk,
    deleteTranscriptById: deleteTranscriptById,
	saveTranscript: saveTranscript,
	getFeaturedUsers: getFeaturedUsers,
	getPublicUser: getPublicUser,
    getTranscriptById: getTranscriptById,
    getTranscriptByTitle: getTranscriptByTitle,
    getTranscriptsByUsername: getTranscriptsByUsername,
	getUser: getUser,
	githubLogin: githubLogin,
	updateUserDescription: updateUserDescription,
    updateTranscript: updateTranscript,
    updateUser: updateUser
};

