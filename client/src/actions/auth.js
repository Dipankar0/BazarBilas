import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({
  name,
  phone,
  password,
  history
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, phone, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const editProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/users/edit', formData, config);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    dispatch(setAlert('Profile Updated', 'success'));

    history.push('/myprofile');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (phone, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ phone, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const passwordChange = (password, newPassword) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ password, newPassword });

  try {
    await axios.post('/api/auth/passwordChange', body, config);
    dispatch(setAlert('Password Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
