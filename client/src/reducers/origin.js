import {
  ADD_ORIGIN,
  GET_ORIGINS,
  GET_ORIGIN,
  CREATE_LANDING,
  GET_LANDING
} from '../actions/types';

const initialState = {
  origin: null,
  origins: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_ORIGIN:
      return {
        ...state,
        origin: payload,
        loading: false
      };
    case GET_ORIGINS:
      return {
        ...state,
        origins: payload,
        loading: false
      };
    case GET_ORIGIN:
      return {
        ...state,
        origin: payload,
        loading: false
      };
    case CREATE_LANDING:
      return {
        ...state,
        origin: payload
      };
    case GET_LANDING:
      return {
        ...state,
        origins: payload
      };
    default:
      return state;
  }
}
