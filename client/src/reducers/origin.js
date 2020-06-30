import { ADD_ORIGIN, GET_ORIGINS } from '../actions/types';

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
    default:
      return state;
  }
}
