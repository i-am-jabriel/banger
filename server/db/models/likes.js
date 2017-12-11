const Sequelize = require('sequelize');
const Promise = require('bluebird');
const { Op } = Sequelize;
const db = require('../');
//const Author = require('./author');

const Likes = db.define('likes', {
    requited:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
    },
    ownerId : Sequelize.INTEGER,
    targetId : Sequelize.INTEGER,
    //Ive actually come to the realization that I hate sequelize
    random : Sequelize.FLOAT,
    //this makes no sense and means this is a trash library
});
module.exports = Likes;

Likes.getLikeBetween = function(a,b){
    return Likes.findOne({
        where:{
            [Op.or]:
            [
                {targetId: a,ownerId: b},
                {targetId: b,ownerId: a}
            ]
        }
    });
}

Likes.changeUpdatedTime = function(a,b){
    return Likes.getLikeBetween(a,b)
        .then(like =>{
            if(like)return like.update({
                random:Math.random()
                //THIS IS THE ONLY WAY TO FORCE A DIRTY UPDATE
                //LMAO. WHY NOT.
            });
        })
}

Likes.findAllMutalLikes = function(userId){
    //Get all mutal likes for a user
    return Likes.findAll({
		where:{
			[Op.or] : [{targetId: userId}, {ownerId : userId}],
            requited:true,
        },
        order: [ ['updatedAt', 'DESC'] ]
    })
    //Then greedy search them so the user who is searching for the data gets back only relevant information
    .then(likes => {
        return Promise.all(likes.map(like =>
            require('./users').findById(userId===like.targetId?like.ownerId:like.targetId)
        ))
        //and make sure you return users that are not the searcher or blank
        //dont know why i had to do this, but here i am
        .then(users=>users.filter(user=>{
            console.log(userId,user.id);
            return user&&userId!==user.id
        }))
    })
}