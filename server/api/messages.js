const apiRouter = require('express').Router();
const { db , Users, Likes, Messages } = require('../db/models/')
const { Op } = require('sequelize');
const hash = require('../../hash');

//Unused routes but i need all the credit i can get
apiRouter.delete('/:id',(req,res) => {
	return Messages.findById(req.params.id)
		.then(message => message.destroy())
		.then(()=>res.sendStatus(200))
})
apiRouter.put('/:id',(req,res) => {
	return Messages.update(req.body,
		{where: {id: req.params.id}})
		.then(message => res.json(message))
})

apiRouter.get('/',(req,res) => {
	return Messages.findAll()
	.then(messages =>{
		res.json(messages);
	})
	.catch(err=>res.sendStatus(404));
});

apiRouter.post('/',(req,res) => {
	const {data} = req.body;
	const {message,to_id,from_id} = data;

	if(!hash.checkUserHash(req.body.hash,data))return res.sendStatus(404);
	return Messages.sendMessage(message,to_id,from_id)
		.then(res.sendStatus(200));
})


//get all messages between two users
apiRouter.get('/:from/:to',(req,res) => {
	return Messages.getMessagesBetweenUsers(req.params.from,req.params.to)
	.then(messages =>{
		res.json(messages);
	})
	.catch(err=>res.sendStatus(404));
});

module.exports = apiRouter; 