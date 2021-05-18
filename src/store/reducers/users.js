import {
  SELECT_USER,
  SET_USER_START,
  SET_USER_SUCCESS,
  SET_USER_FAILURE,
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../actionTypes";

const initialState = {
  selectedUserId: null,
  allIds: [],
  usersById: {},
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: null,
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_USER: {
      const { id } = action.payload;
      return {
        ...state,
        selectedUserId: id,
      };
    }

    case SET_USER_START: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    }

    case SET_USER_SUCCESS: {
      const { id, content } = action.payload;
      return {
        ...state,
        isLoading: false,
        usersById: {
          ...state.usersById,
          [id]: content,
        },
      };
    }

    case SET_USER_FAILURE: {
      const { content } = action.payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: content,
      };
    }

    case GET_USERS_START: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
      };
    }

    case GET_USERS_SUCCESS: {
      const { content } = action.payload;
      return {
        ...state,
        isLoading: false,
        allIds: content.map((user) => user.id),
        usersById: content.reduce((acc, user) => {
          return {
            ...acc,
            [user.id]: user,
          };
        }, {}),
      };
    }

    case GET_USERS_FAILURE: {
      const { content } = action.payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: content,
      };
    }

    default:
      return state;
  }
}
