import { combineReducers } from 'redux';

import loginStatus from './loginStatus';

import user from './user';

import nextUser from './nextUser';

import alert from './alert';

import matches, {matchReducer as match} from './matches';

import messages from './messages';

const rootReducer = combineReducers({
    loginStatus,
    user,
    nextUser,
    alert,
    matches,
    match,
    messages,
});

export default rootReducer;

export * from './loginStatus';

export * from './user';

export * from './nextUser';

export * from './alert';

export * from './matches';

export * from './messages';