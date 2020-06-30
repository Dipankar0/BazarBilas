import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMyCart } from '../../actions/cart';
import Alert from '../layout/Alert';
import img from '../../img/landingPromo.jpg';

const NewOrder = ({ order: { cart }, getMyCart }) => {
  useEffect(() => {
    getMyCart();
  }, [getMyCart]);

  return (
    <Fragment>
      <Alert />
      <div>
        <img className='image' src={img} alt='Promo' />
      </div>
      {cart && cart !== null && (
        <Fragment>
          <div>
            <p className='mid'>
              <strong>Total Item: </strong>
              {cart.quantity}
            </p>
            <p className='mid'>
              <strong>Total Price(BDT): </strong>
              <span className='text-red'>{cart.total}</span>
            </p>
          </div>
          <p className='large text-red'>Cash On Delivery</p>
          <div>
            <Link to='/expressdelivery' className='btn btn-firm'>
              Express Delivery
            </Link>
            <p className='my-1'>
              (You can have 1 hour express delivery within Mirpur area)
            </p>
          </div>
          <div className='my-1'>
            <Link to='/idealdelivery' className='btn btn-firm'>
              Ideal Delivery
            </Link>
            <p className='my-1'>
              (Our ideal delivery is avilable in everywhere in Dhaka)
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

NewOrder.propTypes = {
  order: PropTypes.object.isRequired,
  getMyCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getMyCart })(NewOrder);
