const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

mongoose.connect(process.env.MONGOLAB || config.mongolab);

var expertSchema = new Schema({
    email: String,
    name: String,
    profileImg: String,
    completedChats: Number,
    facebookId: Number,
    uniqueId: String,
    skills: Array
});

const Expert = mongoose.model('Expert', expertSchema);

const featuredExperts = function(request, reply){
    console.log('featuredExperts');
    Expert.find({})
        .sort({completedChats: -1})
        .exec(function(err, experts){
            if (err){
                throw err;
            }
            if (experts) {
                reply(experts);
            } else {
                reply(false);
            }
    });
};

const newExpert = (request, reply) => {
        const payload = request.payload;
        Expert.findOne({ url: payload.url }, function(err, expert){
            if (err){
                throw err;
                reply.file(index);
            }

            if (expert) {
                reply(expert);
            }
            else {
                var new_expert = new Expert();
                new_expert.email = payload.email;
                new_expert.name = payload.name;
                new_expert.profileImg = d.profileImg;
                new_expert.skills = payload.skills;
                new_expert.completedChats = payload.completedChats;
                new_expert.facebookId = payload.facebookId;
                new_expert.uniqueId = payload.uniqueId;
                new_expert.description = 'stuff';
                new_dataset.save( function(err, res){
                if (err){
                    throw error;
                }
                console.log('registration successful, dataset: ',res);
                reply(res);
                });
            }
        });
}

module.exports = {
	featuredExperts: featuredExperts
};