import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { authenticateReducer } from '../reducers/authenticateReducer';
import { currentTutorInfoReducer } from '../reducers/currentTutorInfoReducer';

const rootReducer = combineReducers({
  authenticate: authenticateReducer,
  currentTutorInfo: currentTutorInfoReducer
})

export const configureStore = () => {
  const middlewares: [] = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, composedEnhancers);

  return store;
};
