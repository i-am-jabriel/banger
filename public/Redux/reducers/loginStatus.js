//import axios from 'axios';
//import { createUserHash } from '../../../hash';
//import socket from '../socket';

// ACTION TYPES
const LOGIN_STATUS = 'LOGIN_STATUS'

// ACTION CREATORS
export function setLoginStatus(value){
    return {
        type : LOGIN_STATUS,
        value
    }
}

// REDUCER
export default function reducer (state = false, action) {
  switch (action.type) {
    case LOGIN_STATUS:
        return action.value;
    default:
      return state;
  }

}