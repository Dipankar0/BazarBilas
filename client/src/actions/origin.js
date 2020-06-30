import axios from 'axios';
import { setAlert } from './alert';
import { ADD_ORIGIN, GET_ORIGINS } from './types';

export const addOrigin = (fd, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const res = await axios.post('/api/origin/add', fd, config);

    dispatch({
      type: ADD_ORIGIN,
      payload: res.data
    });
    //history.push('/')
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getAllOrigins = () => async dispatch => {
  try {
    const res = await axios.get('/api/origin');
    dispatch({
      type: GET_ORIGINS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getOriginsBySection = section => async dispatch => {
  try {
    const res = await axios.get(`/api/origin/section/${section}`);
    dispatch({
      type: GET_ORIGINS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
