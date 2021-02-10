import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { app } from "./Reducers/appReducer";

const reducers = combineReducers({
  app,
});

export const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;
