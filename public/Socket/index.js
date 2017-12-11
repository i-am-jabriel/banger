const socket = io();
import store, {updateAlert,updateMatches, fetchMatches, fetchMessages} from '../Redux/';
console.log('IO HAS BEEN CONNECTED');

socket.on('message',data=>{
    console.log(data);
    const action = updateAlert({
        title : 'Gnarly!',
        body : 'You have recieved a new message from ('+data.fromUser.displayName+')',
        messageId : data.fromUser.id,
    });
    store.dispatch(action);
    fetchMessages();
    fetchMatches();
})
socket.on('like',data=>{
    const action = updateAlert({
        title : 'Woah!',
        body : 'You have been liked by a new user ('+data.displayName+')'
    });
    store.dispatch(action); 
    fetchMatches()
})
socket.on('match',data=>{
    const action = updateAlert({
        title : 'Tublear!',
        body : 'You have been have matched with a new user ('+data.displayName+')',
        messageId : data.id,
    });
    store.dispatch(action); 
    fetchMatches()
})

export default socket;