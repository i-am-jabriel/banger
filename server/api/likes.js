const apiRouter = require('express').Router();
const { db , Users, Likes, Messages } = require('../db/models/')
const { Op } = require('sequelize');
const hash = require('../../hash');

apiRouter.delete('/:id',(req,res) => {
	return Messages.findById(req.params.id)
		.then(like => like.destroy())
		.then(()=>res.sendStatus(200))
})
apiRouter.put('/:id',(req,res) => {
	return likes.update(req.body,
		{where: {id: req.params.id}})
		.then(like => res.json(like))
})

//Get all likes period for some reason
apiRouter.get('/', (req, res) => {
	return Likes.findAll()
	.then(users => {
		res.json(users);
	})
})

//vote on a user and if you like them or not
apiRouter.post('/',(req,res) => {
	if(!hash.checkGenericHash(req.body.hash,req.body.data))return res.sendStatus(404);
	return Users.findById(req.body.data.userId)
		.then(user => {
			if(!user)throw Error('thats me');
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
		.catch(err=>console.log(err) && res.sendStatus(404));
});


//Get all mutal likes 
apiRouter.get('/:uid/', (req, res) => {
	return Likes.findAllMutalLikes(Number(req.params.uid))
	.then(users => {
		res.json(users);
	})
})

module.exports = apiRouter; 