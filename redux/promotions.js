import * as ActionTypes from "./ActionTypes";

export const promos = (
  state = {
    isLoading: true,
    errMess: [],
    promos: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        promos: action.payload,
      };
    case ActionTypes.ADD_PROMOS:
      return { ...state, isLoading: true, errMess: null, promos: [] };
    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        promos: [],
      };
    default:
      return state;
  }
};
