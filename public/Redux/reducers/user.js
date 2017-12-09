import axios from 'axios';
import { createUserHash, createGenericHash } from '../../../hash';
import store from '../';
//import socket from '../socket';

// ACTION TYPES
const UPDATE_USER = 'UPDATE_USER';

// ACTION CREATORS
export function updateUser(user){
    return {
        type : UPDATE_USER,
        user
    }
}

// REDUCER
export default function reducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
        return action.user;
    default:
      return state;
  }
}

//Ajax Helper Methods
export function createUser(fbData){
    fbData = fbData.authResponse || fbData;
    let data = {
        id : fbData.id || fbData.userID,
        name : fbData.name,
        email : fbData.email,
        pictureUrl : fbData.picture?fbData.picture.data.url:''
    }
    let val = {
        data,
        hash:createUserHash(data)
    }
    axios.post('/api/users',val)
        .then(res => res.data)
        .then(user => store.dispatch(updateUser(user)));
}

export function updateServerWithUserData(inputData){
    let data = {
        name : inputData.name,
        bio : inputData.bio,
    }
    let val = {
        data,
        hash: createGenericHash(data)
    }
    axios.post('/api/users/'+inputData.id,val)
        .then(res => res.data)
        .then(user => store.dispatch(updateUser(user)));
}