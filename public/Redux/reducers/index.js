import { combineReducers } from 'redux';

import loginStatus from './loginStatus';

import user from './user';

import nextUser from './nextUser';


const rootReducer = combineReducers({
    loginStatus,
    user,
    nextUser,
});

export default rootReducer;

export * from './loginStatus';

export * from './user';

export * from './nextUser';