const Sequelize = require('sequelize');
const db = require('../');
//const Author = require('./author');

const Likes = db.define('likes', {
    requited:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
    },
    ownerId : Sequelize.INTEGER,
    targetId : Sequelize.INTEGER,
});

module.exports = Likes;