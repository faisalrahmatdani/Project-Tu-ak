import * as constants from "./constants";

const INITIAL_STATE = {
  loading: false,
  test: "Welcome to Next JS Digiform Boilerplate",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.SET_LOADING:
      return Object.assign({}, state, {
        loading: action.payload,
      });
    default:
      return state;
  }
};
