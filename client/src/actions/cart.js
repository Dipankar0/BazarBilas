import axios from 'axios';
import { setAlert } from './alert';
import { ADD_CART, GET_CART, MODIFY_ITEM } from './types';

export const addItemToCart = id => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/api/cart/addProduct/${id}`, config);
    dispatch({
      type: ADD_CART,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getMyCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart/my');
    dispatch({
      type: GET_CART,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const reduceCartItem = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/minus/${id}`);
    dispatch({
      type: MODIFY_ITEM,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addCartItem = id => async ditpatch => {
  try {
    const res = await axios.get(`/api/cart/plus/${id}`);
    console.log('hice');
    ditpatch({
      type: MODIFY_ITEM,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => ditpatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const removeCartItem = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/remove/${id}`);
    dispatch({
      type: MODIFY_ITEM,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
