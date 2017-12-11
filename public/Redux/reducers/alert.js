// ACTION TYPES
const UPDATE_ALERT = 'UPDATE ALERT';

// ACTION CREATORS
export function updateAlert(alert){
    return {
        type : UPDATE_ALERT,
        alert
    }
}

// REDUCER
export default function reducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_ALERT:
        return action.alert;
    default:
      return state;
  }
}