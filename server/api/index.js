'use strict'
const apiRouter = require('express').Router()
const { db , Users, Likes, Messages } = require('../db/models/')
const { Op } = require('sequelize');
const hash = require('../../hash');


apiRouter.use('/likes', require('./likes'));
apiRouter.use('/users', require('./users'));
apiRouter.use('/messages', require('./messages'));

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!





//Didnt have time to split smh



//get all messages



//Get a random next user
apiRouter.get('/nextUser/:uid/',(req,res) =>{
	return Users.findById(req.params.uid)
		.then(user =>{
			return user.getNextUser();
		})
		.then(user => {
			res.json(user);
		})
		.catch(err=>res.sendStatus(404));
});





//More secure this way, dont want anybody to just come in and request to delete data...
apiRouter.post('/delete/like',(req,res)=>{
	const {data,checkHash } = req.body;
	const {a,b} = data;
	if(hash.checkGenericHash(checkHash,data))return res.sendStatus(404);
	Promise.all([
	Likes.getLikeBetween(a,b)
		.then(like => like.destroy())
	,
	Messages.getMessagesBetweenUsers(a,b)
		.then(messages => Promise.all(messages.map(message => message.destroy())))
	])
	.then(data => res.sendStatus(200))
});

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;