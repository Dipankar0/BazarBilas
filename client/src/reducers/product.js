import {
  GET_PRODUCT,
  UPDATE_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS,
  CREATE_HOTSELL,
  GET_HOTSELL
} from '../actions/types';

const initialState = {
  product: null,
  products: [],
  total: 0,
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        product: null,
        loading: false
      };
    case CREATE_HOTSELL:
      return {
        ...state,
        product: payload
      };
    case GET_HOTSELL:
      return {
        ...state,
        products: payload
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    default:
      return state;
  }
}
