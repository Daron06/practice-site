import { combineReducers } from 'redux';

import { tasks } from './activities/reducer';
import { resources } from './resources/reducer';

export const rootReducer = combineReducers({ tasks, resources });
