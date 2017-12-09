
var serverCode = '~ban|ger L0L!'; //Don't worry this will be different when the app goes live
var modFun1 = 7;
var modFun2 = 3;

module.exports =  {
    hash,
    createUserHash,
    checkUserHash,
    createGenericHash,
    checkGenericHash,
}
function hash(){
    let key = '';
    const md5List = [serverCode].concat(...arguments).map(item=>md5(item));
    let currentIndex = md5List.length % modFun1;
    for(let i=0;i<32;i++){
        if(!i%modFun2)currentIndex++;
        if(!i%modFun1)currentIndex++;
        if(currentIndex >= md5List.length)currentIndex=0;
        key += md5List[currentIndex].charAt(i);
    }
    return key;
}
function createUserHash(data){
    return hash(data.id,data.name,'lol i got tricks',data.email,'one more for the ladies');
}
function checkUserHash(checkHash,data){
    return checkHash === createUserHash(data);
}
function  createGenericHash(data){
    var vals = Object.keys(data).map(key=>data[key])
    return hash('so troll',...vals,'lel');
}
function checkGenericHash(checkHash,data){
    return checkHash === createGenericHash(data);
}
//I thought this would be a default JS Library LMAO;
//here is a temp md5 
const letters=[];
let lastLetter = ' ';
do{
    letters.push(lastLetter);
    lastLetter = String.fromCharCode(lastLetter.charCodeAt(0)+1);
}while(lastLetter !== '~');
letters.push('~');

//works best with strings tho
function md5(a){
    var val = '';
    var str = a + '';
    for(let i=0;i<32;i++){
        let index = Math.abs(modFun1 * modFun2 * str.length * (i-modFun2) + modFun1 + str.charCodeAt(i % str.length));
        val += letters[index % letters.length];
    }
    return val.substring(0,32);
}