'use strict'
const apiRouter = require('express').Router()
const { db , Users, Likes, Messages } = require('../db/models/')
const { Op } = require('sequelize');
const hash = require('../../hash');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
apiRouter.get('/users', (req, res) => {
	return Users.findAll()
	.then(users => {
		res.json(users);
	})
	.catch(err=>{
		res.sendStatus(404);
	})
})


//get all messages
apiRouter.get('/messages',(req,res) => {
	return Messages.findAll()
	.then(messages =>{
		res.json(messages);
	})
	.catch(err=>res.sendStatus(404));
});

apiRouter.post('/messages',(req,res) => {
	const {data} = req.body;
	const {message,to_id,from_id} = data;

	if(!hash.checkUserHash(req.body.hash,data))return res.sendStatus(404);
	return Messages.sendMessage(message,to_id,from_id)
		.then(res.sendStatus(200));
})


//get all messages between two users
apiRouter.get('/messages/:from/:to',(req,res) => {
	return Messages.getMessagesBetweenUsers(req.params.from,req.params.to)
	.then(messages =>{
		res.json(messages);
	})
	.catch(err=>res.sendStatus(404));
});

//Get Info on a specific user
apiRouter.get('/users/:uid',(req,res) => {
	return Users.findById(req.params.uid)
	.then(user=>{
		res.json(user);
	})
	.catch(err=>res.sendStatus(404));
});

//Get all mutal likes 
apiRouter.get('/likes/:uid/', (req, res) => {
	return Likes.findAllMutalLikes(Number(req.params.uid))
	.then(users => {
		res.json(users);
	})
})

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

apiRouter.post('/users', (req,res) => {
	if(!hash.checkUserHash(req.body.hash,req.body.data))return res.sendStatus(404);
	return Users.createFromFbData(req.body.data)
		.then(user => {
			res.json(user);
		})
		.catch(err=>res.sendStatus(404));
});


//Update the data for a specific user
apiRouter.post('/users/:uid',(req,res) => {
	if(!hash.checkGenericHash(req.body.hash,req.body.data))return res.sendStatus(404);
	return Users.update({
		displayName:req.body.data.name,
		bio:req.body.data.bio,
	},
	{
		where:{id:req.params.uid},
		returning:true,
	})
		.then(user => {
			return Users.findById(req.params.uid)
		})
		.then(user => {
			res.json(user);
		})
		.catch(err=>res.sendStatus(500));
});

//Get all likes period for some reason
apiRouter.get('/likes', (req, res) => {
	return Likes.findAll()
	.then(users => {
		res.json(users);
	})
})

//vote on a user and if you like them or not
apiRouter.post('/likes',(req,res) => {
	if(!hash.checkGenericHash(req.body.hash,req.body.data))return res.sendStatus(404);
	return Users.findById(req.body.data.userId)
		.then(user => {
			return user.votedOnUser(req.body.data.targetId);
		})
		.tap(user =>{
			if(req.body.data.vote)return user.likeUser(req.body.data.targetId)
		})
		.then(user => {
			return user.getNextUser();
		})
		.then(user =>{
			return res.json(user)
		})
		.catch(err=>res.sendStatus(404));
});

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;