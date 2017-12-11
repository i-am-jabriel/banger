const io = require('socket.io')(require('../'));

const clientList = [];
clientList.getClientById = function(id){
    return this.reduce((old,item)=>item.id===id?item:old,null);
}
clientList.getSocketById = function(id){
    let client = this.getClientById(id)
    return client ? client.socket : null;
}

class Client{
    constructor(id,socket){
        this.id=id;
        this.socket=socket;
        clientList.push(this);
    }
    disconnect(){
        let index = clientList.indexOf(this);
        clientList.splice(index,1);
    }
}

io.on('connection', function(socket){
    socket.once('login',data=>{
        let client=new Client(data.id,socket);
         
        socket.once('disconnect',data=>{
            client.disconnect();
            client=null;
        });

        //For all these events if the server recieves this message and the clients connected send the data to that client
        //Turns out this code was useless because I ended up made the models send out the sockets
        /*
        ['message','match','like'].forEach(event=>{
            socket.on(event,data=>{
                let sock = clientList.getSocketById(data.to_id)
                if(sock)sock.emit(event,data);
            });
        });*/
    });
});
   

module.exports = {
    io,
    sendEventToId(id,event,data){
        // console.log('attempting to send ',event,'to userId',id);
        let sock = clientList.getSocketById(id);
        if(! sock)return;
        sock.emit(event,data);
    }  
};