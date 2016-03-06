const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

mongoose.connect(process.env.MONGOLAB || config.mongolab);

const featuredExperts = function(request, reply){
	reply('Heloooo we are experts');
};

var userSchema = new Schema({
    email: String,
    name: String,
    profileImg: String,
    raw: Object,
    token: String,
    completedChats: Array,
    facebookId: Number,
    uniqueId: String
});

module.exports = {
	featuredExperts: featuredExperts
};