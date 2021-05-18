import {
  SELECT_USER,
  SET_USER_START,
  SET_USER_SUCCESS,
  SET_USER_FAILURE,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "./actionTypes";
import { usersApi } from "../api/usersApi";

export const selectUser = (id) => ({
  type: SELECT_USER,
  payload: {
    id,
  },
});

export const getUsersStart = () => ({
  type: GET_USERS_START,
});

export const getUsersSuccess = (content) => ({
  type: GET_USERS_SUCCESS,
  payload: {
    content,
  },
});

export const getUsersFailure = (content) => ({
  type: GET_USERS_FAILURE,
  payload: {
    content,
  },
});

export function fetchAllUsers() {
  return function (dispatch) {
    dispatch(getUsersStart());
    return usersApi
      .getUsers()
      .then((data) => dispatch(getUsersSuccess(data.data)))
      .catch((error) => dispatch(getUsersFailure(error)));
  };
}

export const setUserStart = (content) => ({
  type: SET_USER_START,
  payload: {
    content,
  },
});

export const setUserSuccess = (id, content) => ({
  type: SET_USER_SUCCESS,
  payload: {
    id,
    content,
  },
});

export const setUserFailure = (content) => ({
  type: SET_USER_FAILURE,
  payload: {
    content,
  },
});

export function setUser(user) {
  return function (dispatch) {
    dispatch(setUserStart());
    return usersApi
      .updateUser(user)
      .then((data) => dispatch(setUserSuccess(user.id, data.data)))
      .catch((error) => dispatch(setUserFailure(error)));
  };
}
