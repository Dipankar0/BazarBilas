import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { passwordChange } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';

const PasswordChange = ({ passwordChange }) => {
  const [formDate, setFormData] = useState({
    newPassword: '',
    newPassword2: '',
    password: ''
  });

  const [see, setSee] = useState({
    passwordView: false
  });

  const viewPassword = e => {
    e.preventDefault();
    setSee({
      passwordView: !passwordView
    });
  };

  const { newPassword, newPassword2, password } = formDate;

  const { passwordView } = see;

  const onChange = e =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setAlert('New Passwords do not match', 'danger');
    } else {
      passwordChange(password, newPassword);
    }
  };

  return (
    <Fragment>
      <Alert />
      <p className='lead text-deep'>
        <i className='fas fa-user'></i> Update your password
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type={passwordView ? 'text' : 'password'}
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type={passwordView ? 'text' : 'password'}
            placeholder='New Password'
            name='newPassword'
            value={newPassword}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type={passwordView ? 'text' : 'password'}
            placeholder='Confirm New Password'
            name='newPassword2'
            value={newPassword2}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          {passwordView ? (
            <i class='far fa-eye-slash' onClick={e => viewPassword(e)}>
              {' '}
              Hide Password
            </i>
          ) : (
            <i class='far fa-eye' onClick={e => viewPassword(e)}>
              {' '}
              View Password
            </i>
          )}
        </div>
        <input type='submit' className='btn btn-firm' value='Update' />
      </form>
    </Fragment>
  );
};

PasswordChange.propTypes = {
  passwordChange: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { passwordChange })(PasswordChange);
