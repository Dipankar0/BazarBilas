import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

const Home = ({ auth: { user } }) => {
  return (
    <Fragment>
      {user && user.phone === '01312456526' && (
        <Fragment>
          <p className='large text-firm'>Welcome To Management</p>
          <Grid container spacing={3}>
            <Grid item>
              <Link to='/createOrigin' className='btn btn-firm'>
                Create Origin
              </Link>
            </Grid>
            <Grid item>
              <Link to='addProduct' className='btn btn-firm'>
                Add Product
              </Link>
            </Grid>
            <Grid item>
              <Link to='/allprocessingorderlist' className='btn btn-firm'>
                Processing Orders
              </Link>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
