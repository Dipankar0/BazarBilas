import {
  ADD_CART,
  GET_CART,
  MODIFY_ITEM,
  ADD_ORDER,
  GET_ADDRESS,
  GET_ORDERS,
  LOGOUT
} from '../actions/types';

const initialState = {
  cart: null,
  orders: [],
  order: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CART:
      return {
        ...state,
        cart: payload,
        loading: false
      };
    case GET_CART:
      return {
        ...state,
        cart: payload,
        loading: false
      };
    case MODIFY_ITEM:
      return {
        ...state,
        cart: payload,
        loading: false
      };
    case ADD_ORDER:
      return {
        ...state,
        order: payload,
        orders: null,
        cart: null,
        loading: false
      };
    case GET_ADDRESS:
      return {
        ...state,
        order: payload,
        loading: false
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        cart: null,
        order: null,
        orders: []
      };
    default:
      return state;
  }
}
