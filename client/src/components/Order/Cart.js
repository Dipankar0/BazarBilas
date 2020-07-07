import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import {
  getMyCart,
  reduceCartItem,
  addCartItem,
  removeCartItem
} from '../../actions/cart';

const Cart = ({
  order: { cart },
  getMyCart,
  reduceCartItem,
  addCartItem,
  removeCartItem
}) => {
  useEffect(() => {
    getMyCart();
  }, [getMyCart]);

  const minusItem = id => {
    reduceCartItem(id);
  };

  const plusItem = id => {
    addCartItem(id);
  };

  const removeItem = id => {
    removeCartItem(id);
  };

  return (
    <Fragment>
      {cart && cart !== null ? (
        <Fragment>
          {cart.products.length > 0 ? (
            <Fragment>
              {' '}
              {cart.products.map(product => (
                <Grid container className='my-1 b-1'>
                  <Grid item md={6} xs={6} className='p-1'>
                    <img
                      src={product.product.files[0]}
                      alt='product'
                      style={{ width: '150px', height: '150px' }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Grid item>
                      <div className='my-1'>
                        <p>{product.product.name}</p>
                        <p>{product.product.price} Taka</p>
                      </div>
                    </Grid>
                    <Grid item>
                      <p className='inline lead my-1'>
                        <button
                          className='  badge-golden '
                          onClick={id => plusItem(product.product._id)}
                        >
                          <i class='fas fa-plus'></i>
                        </button>{' '}
                        <p
                          style={{ width: '60px' }}
                          className='text-center bd-primary'
                        >
                          {product.count}
                        </p>{' '}
                        <button
                          className='  badge-red '
                          onClick={id => minusItem(product.product._id)}
                        >
                          <i class='fas fa-minus'></i>
                        </button>
                      </p>
                      <button
                        className='btn btn-red'
                        onClick={id => removeItem(product.product._id)}
                      >
                        Remove
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <p className='mid'>
                <strong>Total Item: </strong>
                {cart.quantity}
              </p>
              <p className='mid'>
                <strong>Total Price: </strong>
                {cart.total}
              </p>
              <Link to='/newOrder' className='btn btn-red'>
                Place Order
              </Link>
            </Fragment>
          ) : (
            <Fragment>You have not added any item to cart</Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>You have not added any item to cart</Fragment>
      )}
    </Fragment>
  );
};

Cart.propTypes = {
  order: PropTypes.object.isRequired,
  getMyCart: PropTypes.func.isRequired,
  reduceCartItem: PropTypes.func.isRequired,
  addCartItem: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, {
  getMyCart,
  reduceCartItem,
  addCartItem,
  removeCartItem
})(Cart);
