import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const MyProfile = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Fragment>
      {user && user !== null && (
        <Fragment>
          {user.email && user.email ? (
            <div className='pl-3 p-1'>
              <Link to='/editprofile'>Edit Profile</Link>
            </div>
          ) : (
            <div className='pl-3 p-1'>
              <Link to='/editprofile'>Add Email</Link>
              <p className='lead'>
                You can only reset password with your email address
              </p>
            </div>
          )}
          <div className='m-1 pl-2'>
            <p className='text-firm large'>{user.name}</p>
            <p>{user.phone}</p>
            <p>{user.email}</p>
            <p>
              <Link to='/cart' className='btn btn-golden my-1'>
                My Cart
              </Link>
            </p>
            <p>
              <Link to='/myorderlist' className='btn btn-golden my-1'>
                My Orders
              </Link>
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

MyProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(MyProfile);
