import * as ActionTypes from "./ActionTypes";

export const leaders = (
  state = {
    isLoading: true,
    errMess: [],
    leaders: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaders: action.payload,
      };
    case ActionTypes.ADD_LEADERS:
      return { ...state, isLoading: true, errMess: null, leaders: [] };
    case ActionTypes.LEADERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        leaders: [],
      };
    default:
      return state;
  }
};
