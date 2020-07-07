import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import {
  addItemToCart,
  getMyCart,
  reduceCartItem,
  addCartItem
} from '../../actions/cart';

const ProductItem = ({
  auth: { isAuthenticated },
  product: { _id, name, quantity, price, notPrice, available, brand, files },
  addItemToCart,
  addCartItem,
  reduceCartItem,
  getMyCart,
  order: { cart },
  match,
  exitItem
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

  const addToCart = id => {
    addItemToCart(id);
  };

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
        {isAuthenticated && (
          <Fragment>
            {available && available === 'no' ? (
              <Fragment>
                <div>
                  <p className='lead text-red'>Stock Out</p>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {cart !== null ? (
                  <Fragment>
                    {(exitItem = cart.products.find(
                      item => item.product._id === _id
                    )) ? (
                      <p className='inline addtocart text-center '>
                        <button
                          className='  badge-firm '
                          onClick={id => plusItem(exitItem.product._id)}
                        >
                          <i class='fas fa-plus'></i>
                        </button>{' '}
                        <p style={{ width: '40%' }} className=' badge-golden'>
                          {exitItem.count}
                        </p>{' '}
                        <button
                          className='  badge-red '
                          onClick={id => minusItem(exitItem.product._id)}
                        >
                          <i class='fas fa-minus'></i>
                        </button>
                      </p>
                    ) : (
                      <button
                        className='btn btn-golden addtocart'
                        onClick={e => addToCart(_id)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </Fragment>
                ) : (
                  <button
                    className='btn btn-golden addtocart'
                    onClick={e => addToCart(_id)}
                  >
                    Add to Cart
                  </button>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
};

ProductItem.defaultProps = {
  showActions: true
};

ProductItem.propTypes = {
  auth: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  getMyCart: PropTypes.func.isRequired,
  addCartItem: PropTypes.func.isRequired,
  reduceCartItem: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
});

export default connect(mapStateToProps, {
  addItemToCart,
  reduceCartItem,
  addCartItem,
  getMyCart
})(ProductItem);
