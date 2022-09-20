import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

// import redux here
import example from "./example/reducer";

const rootReducer = {
  example,
};

const reducer = combineReducers(rootReducer);
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
