import axios from 'axios';
import store, { fetchMatches } from '../';
import {createGenericHash} from '../../../hash';
// ACTION TYPES
const UPDATE_MESSAGES = 'UPDATE MESSAGES';

// ACTION CREATORS
export function updateMessages(messages){
    return {
        type : UPDATE_MESSAGES,
        messages
    }
}

// REDUCER
export default function reducer (state = [], action) {
  switch (action.type) {
    case UPDATE_MESSAGES:
        return action.messages;
    default:
      return state;
  }
}

export function fetchMessages(to_id,from_id){
    let state = store.getState();
    let id = to_id || state.user.id;
    let matchId = from_id || state.match.id;

    if(!id||!matchId)return;
    axios.get('/api/messages/'+id+'/'+matchId)
        .then(res => res.data)
        .then(messages => {
            if(!messages)return;
            if(messages.length!==state.messages.length)store.dispatch(updateMessages(messages))
        });
}

export function sendMessage(message,to_id,from_id){
    var data = {
        message,
        to_id,
        from_id,
    };
    var val ={
        data,
        hash:createGenericHash(data),
    }
    axios.post('/api/messages',val)
        .then(res =>{
            fetchMessages(to_id,from_id);
            fetchMatches();
        });

}