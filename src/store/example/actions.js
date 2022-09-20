import * as constants from "./constants";

export function setLoading(loading) {
  return { type: constants.SET_LOADING, payload: loading };
}
