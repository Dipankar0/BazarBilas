import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert';

const Login = ({ login, isAuthenticated }) => {
  const [formDate, setFormData] = useState({
    phone: '',
    password: ''
  });

  const { phone, password } = formDate;

  const onChange = e =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(phone, password);
  };

  //Redirect
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <Alert />
      <h1 className='large text-firm'>Log In</h1>
      <p className='lead text-deep'>
        <i className='fas fa-user'></i> Log Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Mobile Number'
            name='phone'
            value={phone}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-firm' value='Login' />
      </form>
      <p className='my-1 text-red'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
