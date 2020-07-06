import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCTS,
  CREATE_HOTSELL,
  GET_HOTSELL
} from './types';

// Add or update product
export const addProduct = (fd, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    const res = await axios.post('/api/product/add', fd, config);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });

    dispatch(setAlert('Profile Created', 'success'));

    //history.push(`/products/productId/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/product');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProductsByOrigin = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/originId/${id}`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProductById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/productId/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateProduct = (formData, id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    const res = await axios.post(`/api/product/update/${id}`, formData, config);
    console.log('action');
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
    history.push(`/products/productId/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const updateFiles = (fd, id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const res = await axios.post(`/api/product/updateFiles/${id}`, fd, config);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
    history.push(`/products/productId/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addHotSellByID = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/addhotSell/${id}`);
    dispatch({
      type: CREATE_HOTSELL,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const removeHotSellByID = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/removehotSell/${id}`);
    dispatch({
      type: CREATE_HOTSELL,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getHotSells = () => async dispatch => {
  try {
    const res = await axios.get('/api/product/findHotSell');
    dispatch({
      type: GET_HOTSELL,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const makeItemNotAvailable = id => async dispatch => {
  try {
    const res = await axios.get(`/api/product/makeNotAvailable/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
