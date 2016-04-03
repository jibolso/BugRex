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

const getTranscriptsByUsername = (username, callback) => {
    Transcript.find({mainOperator: username}, (err, transcripts) => {
        if (err) {
            throw err;
            callback(false);
        }

        if (transcripts) {
            callback(transcripts);
        } else {
            callback(false);
        }
    })
}

const getTranscriptById =  (id, callback) => {
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

const githubLogin = (payload, username, callback) => {
 	User.findOne({ username: username }, function(err, user){
        if (err){
            throw err;
            callback(user);
        }

        if (user) {
            console.log('found user: ', user);
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
                    return false;
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
	saveTranscript: saveTranscript,
	getFeaturedUsers: getFeaturedUsers,
	getPublicUser: getPublicUser,
    getTranscriptById: getTranscriptById,
    getTranscriptsByUsername: getTranscriptsByUsername,
	getUser: getUser,
	githubLogin: githubLogin,
	updateUserDescription: updateUserDescription
};

