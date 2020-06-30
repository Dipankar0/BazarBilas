import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

const ProductItem = ({
  auth: { isAuthenticated },
  product: { _id, name, quantity, price, notPrice, desciption, brand, files }
}) => {
  return (
    <Fragment>
      <Grid item xs={6} md={3}>
        <Link to={`/products/productId/${_id}`}>
          <div className='my-1'>
            <Fragment>
              <img className='originImage' src={files[0]} alt='Origin' />
            </Fragment>
            <div className='text-center'>
              <p>
                <strong>Name: </strong> {name}
              </p>
              <p>
                <strong>Quantity: </strong> {quantity}
              </p>
              <p>
                <strong>Price(BDT): </strong>
                <span style={{ textDecoration: 'line-through' }}>
                  {notPrice}
                </span>{' '}
                <span className='text-red lead'>{price}</span>
              </p>
            </div>
          </div>
        </Link>
      </Grid>
    </Fragment>
  );
};

ProductItem.defaultProps = {
  showActions: true
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProductItem);
