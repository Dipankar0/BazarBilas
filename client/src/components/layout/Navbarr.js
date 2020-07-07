import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getMyCart } from '../../actions/cart';
import logo from '../../img/logo.jpeg';
import { Button, Menu, MenuItem } from '@material-ui/core';

const Navbarr = ({
  auth: { isAuthenticated, user, loading },
  logout,
  getMyCart,
  order: { cart }
}) => {
  useEffect(() => {
    getMyCart();
  }, [getMyCart]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const authLinks = (
    <nav className='navbar bg-firm'>
      <div>
        <h1 className=''>
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
              style={{ width: '30px', height: '30px' }}
            />{' '}
            azar Bilas
          </Link>
        </h1>
      </div>
      <div>
        <p>
          {cart && cart.products.length > 0 ? (
            <Link to='/cart' style={{ color: '#fdf2e9' }}>
              Buy <i class='fas fa-cart-plus'></i> {cart.products.length}
            </Link>
          ) : (
            <Link to='/cart'>
              <i class='fas fa-cart-plus'></i>{' '}
            </Link>
          )}
        </p>
        {user && user.name && (
          <p>
            <Link
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <i class='fas fa-user-circle'></i>{' '}
              <span className='hide-sm'>{user.name}</span>
            </Link>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to='/myprofile'>My Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to='/myorderlist'>My Orders</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to='/mypasswordchange'>Change Password</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link onClick={logout} to='/login'>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </p>
        )}
      </div>
    </nav>
  );

  const guestLinks = (
    <nav className='navbar bg-firm'>
      <div>
        <h1 className=''>
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
              style={{ width: '30px', height: '30px' }}
            />{' '}
            azar Bilas
          </Link>
        </h1>
      </div>
      <div>
        <p>
          <Link to='/login'>Login</Link>
        </p>
      </div>
    </nav>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Navbarr.propTypes = {
  logout: PropTypes.func.isRequired,
  getMyCart: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

export default connect(mapStateToProps, { logout, getMyCart })(Navbarr);
