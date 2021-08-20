import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { authenticateReducer } from '../reducers/authenticateReducer';
import { currentTutorInfoReducer } from '../reducers/currentTutorInfoReducer';
import { currentRoomReducer } from '../reducers/currentRoomReducer';

const rootReducer = combineReducers({
  authenticate: authenticateReducer,
  currentTutorInfo: currentTutorInfoReducer,
  currentRoom: currentRoomReducer
})

export const configureStore = () => {
  const middlewares: [] = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, composedEnhancers);

  return store;
};
