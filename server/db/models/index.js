'use strict';

const db = require('../');

const Users = require('./users');

const Likes = require('./likes');

const Messages = require ('./messages');

/*
I mean i tried this i promise

Users.belongsToMany(Users,{
	through: Likes,
	foreignKey: 'liker',
	targetKey: 'liked',
	as:'Likes',
});

*/

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// Exporting all models from here seems like a good idea!

// This is also probably a good place for you to set up your associations

module.exports = { db , Users , Likes , Messages };