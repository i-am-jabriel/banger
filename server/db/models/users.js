const Sequelize = require('sequelize');
const {fn,col,Op} = Sequelize;
const db = require('../');
const Likes = require('./likes');
const Messages = require('./messages');
const { sendEventToId } = require('../../socket');

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
    fakeUser:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
    }
});
//--Table Functions
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

//--Row Functions
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
                sendEventToId(targetId,'match',this);
                Users.findById(targetId)
                    .then(target=>sendEventToId(this.id,'match',target));
                return pastEntry.update({requited:true})
            }
            return Likes.findOne({
                where:{
                    ownerId:this.id,
                    targetId:targetId,
                }
            })
        })
        .then(pastEntry => {
            if(pastEntry)return pastEntry;
            sendEventToId(targetId,'like',this);
            return Likes.create({
                ownerId:this.id,
                targetId:targetId,
            })  
        })
        .catch(console.error)
}


Users.prototype.votedOnUser = function(targetId){
    return this.update({
        viewedUsers : fn('array_append', col('viewedUsers'), targetId)
    });
}

Users.prototype.getNextUser = function(){
    return Users.findAll()
    .then(users=>
            getRandomElement(subtractFromArray(users,[this.id].concat(Array(...this.viewedUsers))))
        )
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
    console.log('length  sorted down',arr1.length,val.length,'l2.len',arr2.len);
    return val;
}

function getRandomElement(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}