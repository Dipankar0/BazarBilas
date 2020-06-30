import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMyCart } from '../../actions/cart';
import { addOrder, getMyAddress } from '../../actions/order';
import Alert from '../layout/Alert';

const initialState = {
  location: '',
  thana: '',
  district: '',
  phone: '',
  type: 'normal'
};

const NormalDelivery = ({
  order: { cart, order, loading },
  getMyCart,
  addOrder,
  getMyAddress,
  totalPrice,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    getMyCart();
    if (!order) getMyAddress('normal');
    if (!loading) {
      const addressData = { ...initialState };
      for (const key in order) {
        if (key in addressData) addressData[key] = order[key];
      }
      setFormData(addressData);
    }
  }, [getMyCart, getMyAddress, order, loading]);

  const { location, thana, district, phone } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addOrder(formData, history);
  };

  if (cart && cart.total) {
    totalPrice = cart.total + 50;
  }

  return (
    <Fragment>
      <Alert />
      {cart && cart !== null && (
        <Fragment>
          <div>
            <p className='mid'>
              <strong>Total Item: </strong>
              {cart.quantity}
            </p>
            <p className='mid'>
              <strong>Products Price(BDT): </strong>
              <span className='text-deep'>{cart.total}</span>
            </p>
            <p className='mid'>
              <strong>Delivery Charge(BDT): </strong>
              <span className='text-deep'>50</span>
            </p>
            <p className='mid'>
              <strong>Total Price(BDT): </strong>
              <span className='text-red'>{totalPrice}</span>
            </p>
          </div>
          <p className='large'>Cash On Delivery</p>
          <p className='mid'>Address:</p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Mobile Number'
                  name='phone'
                  value={phone}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>
                  Contact Number for this particaular order
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='House/Street No:'
                  name='location'
                  value={location}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>
                  Ex: Room: 5, Floor: 10, House: 2/B, Road: 20, Nikunja 2
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Thana'
                  name='thana'
                  value={thana}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>Ex: Azampur</small>
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='district'
                  name='district'
                  value={district}
                  onChange={e => onChange(e)}
                />
                <small className='form-text'>Ex: Dhaka</small>
              </div>
              <input
                type='submit'
                placeholder='Confirm'
                className='btn btn-primary my-1'
              />
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

NormalDelivery.propTypes = {
  order: PropTypes.object.isRequired,
  getMyCart: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
  getMyAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getMyCart, addOrder, getMyAddress })(
  NormalDelivery
);
