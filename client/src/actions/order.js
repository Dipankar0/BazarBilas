import axios from 'axios';
import { setAlert } from './alert';
import { saveAs } from 'file-saver';
import { ADD_ORDER, GET_ADDRESS, GET_ORDERS } from './types';

export const addOrder = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    const res = await axios.post('/api/order/new', formData, config);
    dispatch({
      type: ADD_ORDER,
      payload: res.data
    });
    history.push(`/orderconfirmation/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const onSent = id => async dispatch => {
  try {
    await axios.get(`/api/order/onSend/${id}`);
    //history.push('/alldeliveredorderlist');
    dispatch(getAllOrdersByState('processing'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const onDelivered = id => async dispatch => {
  try {
    await axios.get(`/api/order/onDelivery/${id}`);
    //history.push('/alldeliveredorderlist');
    dispatch(getAllOrdersByState('sent'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const onCanceled = (id, history) => async dispatch => {
  try {
    await axios.get(`/api/order/onCancel/${id}`);
    history.push('/myorderlist');
    //dispatch(getAllOrdersByState('processing'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getAllOrdersByState = state => async dispatch => {
  try {
    const res = await axios.get(`/api/order/all/${state}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getMyOrdersByState = state => async dispatch => {
  try {
    const res = await axios.get(`/api/order/my/${state}`);
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getMyOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/order/my');
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const getOrderById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/order/order/${id}`);
    dispatch({
      type: ADD_ORDER,
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

export const getMyAddress = type => async dispatch => {
  try {
    const res = await axios.get(`/api/order/address/${type}`);
    dispatch({
      type: GET_ADDRESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const onOrderPrint = id => async dispatch => {
  try {
    await axios.get(`/api/order/print/${id}`);
    const res = await axios.get('/api/order/fetch-pdf', {
      responseType: 'blob'
    });
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    saveAs(pdfBlob, 'newPdf.pdf');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
