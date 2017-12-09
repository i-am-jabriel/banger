import axios from 'axios';
import { createUserHash, createGenericHash } from '../../../hash';
import store from '../';
//import socket from '../socket';

// ACTION TYPES
const SET_NEXT_USER = 'SET_NEXT_USER';

// ACTION CREATORS
export function setNextUser(user){
    return {
        type : SET_NEXT_USER,
        user
    }
}

// REDUCER
export default function reducer (state = {}, action) {
  switch (action.type) {
    case SET_NEXT_USER:
        return action.user;
    default:
      return state;
  }
}

export function fetchNextUser(id){
    axios.get('/api/nextUser/'+id)
        .then(res => res.data)
        .then(user => store.dispatch(setNextUser(user)));
}

export function voteOnUser(userId,targetId,vote){
    let data = {
        userId,
        targetId,
        vote
    }
    let val = {
        data,
        hash:createGenericHash(data)
    }
    axios.post('/api/likes',val)
        .then(res => res.data)
        .then(user => store.dispatch(setNextUser(user)))
}