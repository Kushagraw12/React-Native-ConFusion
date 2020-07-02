import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

//COMMENTS

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error: " + response.status + " : " + response.text
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      }
    )
    .then((response) => response.json)
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

//DISHES

export const fetchDishes = () => (dispatch) => {
  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error: " + response.status + " : " + response.text
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      }
    )
    .then((response) => response.json)
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errMess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

//LEADERS

export const fetchLeaders = () => (dispatch) => {
  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error: " + response.status + " : " + response.text
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      }
    )
    .then((response) => response.json)
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errMess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

//PROMOTIONS

export const fetchPromos = () => (dispatch) => {
  return fetch(baseUrl + "promos")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error: " + response.status + " : " + response.text
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var error = new Error(error.message);
        throw error;
      }
    )
    .then((response) => response.json)
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOTIONS_LOADING,
});

export const promosFailed = (errMess) => ({
  type: ActionTypes.PROMOTIONS_FAILED,
  payload: errMess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promos,
});
