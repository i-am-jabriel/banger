const Sequelize = require('sequelize');
const {fn,col} = Sequelize;
const db = require('../');
const Likes = require('./likes');
//const Author = require('./author');

const Users = db.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    displayName: {
        type: Sequelize.STRING,
    },
    bio: {
        type: Sequelize.TEXT,
    },
    fbId:{
        type: Sequelize.STRING,
    },
    pictureUrl:{
        type: Sequelize.TEXT,
    },
    viewedUsers:{
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue:[],
    },
});
Users.prototype.likeUser = function(targetId){
    return Users.findOne({where:{id:targetId}})
        .then(newUser => {
            return Likes.findOne({
                where:{
                    targetId:this.id,
                    ownerId:targetId
                }
            })
        })
        .then(pastEntry => {
            if(pastEntry){
                return pastEntry.update({requited:true})
            }
            return Likes.create({
                ownerId:this.id,
                targetId:targetId,
            })  
        })
        .catch(console.error)
}

Users.createFromFbData = function(fbData){
    console.log(fbData);
    return Users.findOne({where: {fbId: fbData.id}})
        .then(potentialUser =>{
            if(potentialUser)return potentialUser;
            else return Users.create({
                displayName: fbData.name,
                fbId: fbData.id,
                pictureUrl: fbData.pictureUrl,
                email: fbData.email
            })
        });
}

Users.prototype.votedOnUser = function(targetId){
    return this.update({
        viewedUsers : fn('array_append', col('viewedUsers'), targetId)
    });
}

Users.prototype.getNextUser = function(){
    return Users.findAll()
        .then(users=>{
            return getRandomElement(subtractFromArray(users,[this.id].concat(this.viewedUsers)));
        })
        /*.then(user => {
            return this.viewUser(user.id);
        });*/
}

module.exports = Users;

//tried using map but that didnt work sorry
function subtractFromArray(arr1,arr2){
    let val = [];
    arr1.map(item => item.id).forEach((item,i) => {
        if(arr2.indexOf(item)<0)val.push(arr1[i]);
    });
    return val;
}

function getRandomElement(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}