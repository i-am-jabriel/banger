const apiRouter = require('express').Router();
const { db , Users, Likes, Messages } = require('../db/models/')
const { Op } = require('sequelize');
const hash = require('../../hash');

//Get Info on a specific user
apiRouter.get('/:uid',(req,res) => {
	return Users.findById(req.params.uid)
	.then(user=>{
		res.json(user);
	})
	.catch(err=>res.sendStatus(404));
});

apiRouter.post('/', (req,res) => {
	if(!hash.checkUserHash(req.body.hash,req.body.data))return res.sendStatus(404);
	return Users.createFromFbData(req.body.data)
		.then(user => {
			res.json(user);
		})
		.catch(err=>res.sendStatus(404));
});

//Update the data for a specific user
apiRouter.post('/:uid',(req,res) => {
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

apiRouter.get('/', (req, res) => {
	return Users.findAll()
	.then(users => {
		res.json(users);
	})
	.catch(err=>{
		res.sendStatus(404);
	})
})


apiRouter.delete('/:id',(req,res) => {
	return Messages.findById(req.params.id)
		.then(user => user.destroy())
		.then(()=>res.sendStatus(200))
})

module.exports = apiRouter; 