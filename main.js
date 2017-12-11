'use strict'; 

//Rebuild the database??
const DEBUG = true;

//Create test users that do fake activities?
const TEST = true;



const db = require('./server/db')
const app = require('./server')
const Promise = require('bluebird');
const {io} = require('./server/socket');
const PORT = 1337;

//db.sync({force:true}) // if you update your db schemas, make sure you drop the tables first and then recreate them
db.sync({force:DEBUG})
.then(() => {
  console.log('db synced');
  const server = app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
  io.listen(server);
  if(TEST)testFunction1();
})
.catch(console.log);

module.exports = app;

 

function testFunction1(){
  const { Op } = require('sequelize');
  const first = ['Tom','Jill','Jane','Boosie','Avril','Liz','Carrie','Brandi','Hakeem','Kobe','Julius','Kyle','Leon','Joesph','Tucker','Seyadou','Latrell'];
  const last = ['Rock', 'Wolffe','Smith','Brown','Green','Hardy','Petty','Hendrix','Melle','Bombay','Ryan','Ford','Whiskey','Daniels','Crump','Matreon'];
  const bios =['i rock', 'singularly single', 'looking for hot new singles in your area','i promise im not a bot','lol','im only on here to prove that this works','i live for seeding databases',
  'who even reads these','IF YOU CANT HANDLE ME AT MY WORST YOU DONT DESERVE ME AT MY WORST','Maya Angelou and wine connsorist','IM A MAN [or women no judge pls] OF MY WORDS',
  'INTP \n I enjoy long walks of short piers\n\nSassy and Classy but never brassy\nLife is good tho.',
  'I\'m trying to be the best me i can be in a world that is really trying its hardest to limit me otherwise. \n PnR is life and if you hate it I hate you period.',
  'I enjoy writing fake bios far more than I feel is societally acceptable. But thats a hard stat to get a gauge on',
  'Win. Lose. Draw. Doesn\'t matter to me as long as we had fun. Also butt stuff',
  'Dream big, you\'ll never know your true limits until you are pushed to them. I thought this sort of project would be impossible, but turns out it wasn\'t even that hard LOL',
  'A thousand disappointments in the past cannot equal the power of one positive action right now. Go ahead & go for it.',
  'Good things come to those who believe, better things come to those who are patient, and the best things come to those who don\'t give up.',
  'You were born to win, although to be a winner, you must plan to win, prepare to win, & expect to win.',
  'When you talk, you are repeating what you already know. But if you listen, you may learn something new.',
  "The tragedy in life doesn't lie in not reaching your goal. The tragedy lies in having no goal to reach.",
  "If you'll not settle for anything less than your best, you will be amazed at what you can accomplish in your lives.",
  "I'm just like hey whats up hello",'hihihi','Trying not to be mr. lonely','Howdy how!','Whats sup wit it tho','did you know tourism officials in Tasmania, Australia, are seeking someone to fill the position of "Chief Wombat Cuddler" for an orphaned wombat?',
  'What did you have for lunch today?','Do you agree with the Danish dissection of zoo animals in front of the public?',
  'I love owls, how did you guess?',"Let's cut this bullshit and just meet for a drink (Bubble tea of course).",
  "A tornado flew around my room before you came\n Excuse the mess it made, it usually doesn't rain in\nSouthern California, much like Arizona\nMy eyes don't shed tears, but, boy, they bawl"
  ]
  function getRandomElement(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }
  function prob(n){
    return Math.random()*100<=n;
  }
  
  function randomName(){
    return getRandomElement(first) + ' ' + getRandomElement(last);
  }
  function randomEmail(){
    const domain = ['gmail','hotmail','yahoo','fake','aol'];
    return getRandomElement(last)+getRandomElement(first)+'@'+getRandomElement(domain)+'.com';
  }
  function randomBio(){
    return getRandomElement(bios);
  }
  function fakeActivity(user){
    return Likes.findAllMutalLikes(user.id)
      .then(users=>{
        //If the fake user has a mutal like
        //Send them a message
        if(users.length){
          const targetUser = getRandomElement(users);
          return Messages.sendMessage(randomBio(),targetUser.id,user.id);
        }
        //Otherwise attempt to like all non fake users
        else return Users.findAll({where:{fakeUser:false}})
          .then(users => users.forEach( targetUser => {
            user.likeUser(targetUser.id);
          }))
      })
  }
  const { Users , Likes , Messages } = require('./server/db/models');
  let promsies = [];
  if(DEBUG)for(let i=0;i<25;i++){
    promsies.push(Users.create({
      displayName:randomName(),
      email:randomEmail(),
      fakeUser:true,
      pictureUrl:'http://lorempixel.com/400/400/people/'+i%11,
      bio:randomBio(),
    }))
  }
  Promise.all(promsies)
    .then(userList =>{
      if(!userList.length)return Users.findAll({
        where:{id:{[Op.lt]:26}}
      })
      return userList;
    })
    .then(userList =>{
      console.log('DONE SEEDING THE DATABASE');
      console.log('Starting fake activity!');
      setInterval(()=>{
        fakeActivity(getRandomElement(userList))
      },2500)
    })
    //.catch(console.error);
}