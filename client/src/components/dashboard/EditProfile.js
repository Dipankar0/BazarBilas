import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser, editProfile } from '../../actions/auth';
import Alert from '../layout/Alert';

const initialState = {
  name: '',
  phone: '',
  email: ''
};

const EditProfile = ({
  loadUser,
  editProfile,
  auth: { user, loading },
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!user) loadUser();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in user) {
        if (key in profileData) profileData[key] = user[key];
      }
      setFormData(profileData);
    }
  }, [loadUser, user, loading]);

  const { name, phone, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editProfile(formData, history);
  };

  return (
    <Fragment>
      <Alert />
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>Write your name</small>
          </div>
          <div className='form-group'>
            <input
              type='number'
              placeholder='Mobile Number'
              name='phone'
              value={phone}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>Your Contact Number</small>
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>
              You can only reset password with your email address
            </small>
          </div>
          <input
            type='submit'
            placeholder='Confirm'
            className='btn btn-primary my-1'
          />
        </div>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser, editProfile })(EditProfile);
