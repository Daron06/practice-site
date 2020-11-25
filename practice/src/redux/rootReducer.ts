import { combineReducers } from 'redux';

import { tasks } from './activities/reducer';
import { resources } from './resources/reducer';
import { videos } from './videos/reducer';

export const rootReducer = combineReducers({ tasks, resources, videos });
