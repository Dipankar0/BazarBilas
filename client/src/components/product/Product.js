import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../../actions/product';
import {
  addItemToCart,
  getMyCart,
  reduceCartItem,
  addCartItem
} from '../../actions/cart';
import { Grid } from '@material-ui/core';
import Spinner from '../layout/Spinner';
import ProductImage from './ProductImage';

const Product = ({
  getProductById,
  addItemToCart,
  addCartItem,
  reduceCartItem,
  getMyCart,
  product: { product },
  auth: { isAuthenticated, user },
  order: { cart },
  match,
  exitItem
}) => {
  useEffect(() => {
    getProductById(match.params.id);
    getMyCart();
  }, [getProductById, match.params.id, getMyCart]);

  const minusItem = id => {
    reduceCartItem(id);
  };

  const plusItem = id => {
    addCartItem(id);
    console.log(id);
  };

  const addToCart = e => {
    e.preventDefault();
    addItemToCart(product._id);
  };

  return (
    <Fragment>
      <div className=''>
        {product && product !== null ? (
          <Fragment>
            {isAuthenticated && user._id === product.user && (
              <Link to={`/updateproduct/${product._id}`}>Edit Product</Link>
            )}
            <Grid container>
              <Grid item sm={6} xs={12}>
                <ProductImage product={product} key={product._id} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <div className='pl-2'>
                  <p>
                    <strong>Name: </strong> {product.name}
                  </p>
                  <p>
                    <strong>Quantity: </strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Price(BDT): </strong>
                    <span style={{ textDecoration: 'line-through' }}>
                      {product.notPrice}
                    </span>{' '}
                    <span className='text-red lead'>{product.price}</span>
                  </p>
                </div>
                <div className='pl-2 py-1'>
                  {' '}
                  <Fragment>
                    {isAuthenticated ? (
                      <Fragment>
                        {product.available && product.available === 'no' ? (
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
                                  item => item.product._id === match.params.id
                                )) ? (
                                  <div className='inline'>
                                    <p className='inline addtocart badge-primary '>
                                      <button
                                        className='  badge-golden '
                                        onClick={id =>
                                          plusItem(exitItem.product._id)
                                        }
                                      >
                                        <i class='fas fa-plus'></i>
                                      </button>{' '}
                                      <p
                                        style={{ width: '60px' }}
                                        className='text-center'
                                      >
                                        {exitItem.count}
                                      </p>{' '}
                                      <button
                                        className='  badge-red '
                                        onClick={id =>
                                          minusItem(exitItem.product._id)
                                        }
                                      >
                                        <i class='fas fa-minus'></i>
                                      </button>
                                    </p>
                                    <p className='pl-3'>
                                      <Link to='/cart' className='btn btn-red'>
                                        Buy Now
                                      </Link>
                                    </p>
                                  </div>
                                ) : (
                                  <button
                                    className='btn btn-primary'
                                    onClick={e => addToCart(e)}
                                  >
                                    Add to Cart
                                  </button>
                                )}
                              </Fragment>
                            ) : (
                              <button
                                className='btn btn-primary'
                                onClick={e => addToCart(e)}
                              >
                                Add to Cart
                              </button>
                            )}
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Link to='/register' className='btn btn-primary'>
                        Add to Cart
                      </Link>
                    )}
                  </Fragment>
                </div>
              </Grid>
            </Grid>
            <hr className='my-3' />
            <div className='my-3'>
              <p>
                <strong>Description: </strong> {product.description} Taka
              </p>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Spinner />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Product.propTypes = {
  addItemToCart: PropTypes.func.isRequired,
  getMyCart: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  addCartItem: PropTypes.func.isRequired,
  reduceCartItem: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
  order: state.order
});

export default connect(mapStateToProps, {
  getProductById,
  addItemToCart,
  reduceCartItem,
  addCartItem,
  getMyCart
})(Product);
