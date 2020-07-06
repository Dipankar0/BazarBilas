import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_ORIGIN,
  GET_ORIGINS,
  GET_ORIGIN,
  CREATE_LANDING,
  GET_LANDING
} from './types';

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

export const getOriginById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/origin/originId/${id}`);

    dispatch({
      type: GET_ORIGIN,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const updateOrigin = (formData, id, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    const res = await axios.post(`/api/origin/update/${id}`, formData, config);
    dispatch({
      type: GET_ORIGIN,
      payload: res.data
    });
    //history.push(`/products/productId/${res.data._id}`);
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
    const res = await axios.post(`/api/origin/updateFiles/${id}`, fd, config);
    dispatch({
      type: GET_ORIGIN,
      payload: res.data
    });
    //history.push(`/products/productId/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const addLandingByID = id => async dispatch => {
  try {
    const res = await axios.get(`/api/origin/addLanding/${id}`);
    dispatch({
      type: CREATE_LANDING,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const removeLandingByID = id => async dispatch => {
  try {
    const res = await axios.get(`/api/origin/removeLanding/${id}`);
    dispatch({
      type: CREATE_LANDING,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getLandings = () => async dispatch => {
  try {
    const res = await axios.get('/api/origin/findLanding');
    dispatch({
      type: GET_LANDING,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const makeOriginNotAvailable = id => async dispatch => {
  try {
    const res = await axios.get(`/api/origin/makeNotAvailable/${id}`);
    dispatch({
      type: GET_ORIGIN,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
