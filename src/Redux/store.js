import { createStore, combineReducers } from "redux";
import { app } from "./Reducers/appReducer";

const reducers = combineReducers({
  app,
});

export const store = createStore(reducers);

window.store = store;