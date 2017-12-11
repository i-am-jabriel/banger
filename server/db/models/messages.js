const db = require('../');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { sendEventToId } = require('../../socket');

const Messages = db.define('messages',{
    user_from:Sequelize.INTEGER,
    user_to:Sequelize.INTEGER,
    message:Sequelize.TEXT,
})

Messages.getMessagesBetweenUsers = function(id1,id2){
    //Jesus this would've been easier in RAW SQL. 
    //And thats really saying something
    return Messages.findAll({
        where:{
            user_from:{[Op.or]:[id1,id2]},
            user_to:{[Op.or]:[id1,id2]},
        },
        order: [ ['updatedAt', 'ASC'] ]
    })
}

Messages.sendMessage = function(message,user_to,user_from){
    let sentMessage;
    return Messages.create({
        user_from,
        user_to,
        message
    }).then(message => {
        sentMessage = message;
        require('./likes').changeUpdatedTime(user_from,user_to);
        return require('./users').findById(user_from)
        
    }).then(fromUser => {
        return sendEventToId(user_to , 'message' , Object.assign({},{message},{fromUser}))
    })
}

module.exports = Messages;