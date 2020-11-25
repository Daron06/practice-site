import { combineReducers } from 'redux';

import { tasks } from './tasks/reducer'
import { users } from './users/reducer'
// import { resources } from './resources/reducer';

// export const rootReducer = combineReducers({ tasks, resources });
export const rootReducer = combineReducers({tasks, users});

