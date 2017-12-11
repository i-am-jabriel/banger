import axios from 'axios';
import store from '../';
// ACTION TYPES
const UPDATE_MATCHES = 'UPDATE MATCHES';
const SET_MATCH = 'SET MATCH'

// ACTION CREATORS
export function updateMatches(matches){
    return {
        type : UPDATE_MATCHES,
        matches
    }
}

export function setMatch(match){
    return {
        type : SET_MATCH,
        match
    }
}

// REDUCER
export default function reducer (state = [], action) {
  switch (action.type) {
    case UPDATE_MATCHES:
        return action.matches;
    default:
      return state;
  }
}

export function matchReducer(state = {},action){
    switch (action.type){
        case SET_MATCH:
            return action.match;
        default:
            return state;
    }
}

export function fetchMatches(){
    let state = store.getState();
    let id = state.user.id;
    axios.get('/api/likes/'+id)
        .then(res => res.data)
        .then(matches => {
            //If the store is empty but the api isnt
            if(!state.matches.length && matches.length)return store.dispatch(updateMatches(matches));
            let oldFirstMatch = state.matches[0] || {};
            let newFirstMatch = matches[0] || {};

            if(matches.length!==state.matches.length || 
                oldFirstMatch.displayName !== newFirstMatch.displayName)
                    store.dispatch(updateMatches(matches))
        });
}