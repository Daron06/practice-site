import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { TasksState } from './activities/reducer';

import { rootReducer } from './rootReducer';

export type RootState = Omit<ReturnType<typeof rootReducer>, '$CombinedState'>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
