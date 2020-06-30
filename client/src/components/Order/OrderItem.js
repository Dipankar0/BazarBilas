import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import OrderProductItem from './OrderProductItem';
import { Grid } from '@material-ui/core';

const OrderItem = order => {
  return (
    <div>
      <Grid container spacing={1} className='b-1'>
        <Grid item md={6} xs={12}>
          <p className='mid text-center badge-golden'>Customer: </p>
          <p className='text-deep'>
            Order ID:{' '}
            <Link to={`/print/${order.order._id}`}>{order.order._id}</Link>
          </p>
          <p className='text-deep'>Name: {order.order.user.name}</p>
          <p className='text-deep'>Mobile: {order.order.user.phone}</p>
          <p className='text-deep'>Area: {order.order.location}</p>
          <p className='text-deep'>Thana: {order.order.thana}</p>
          <p className='text-red'>Total Price: {order.order.cart.total}</p>
          <p className='order-date'>
            Ordered on <Moment format='YYYY/MM/DD'>{order.order.date}</Moment>
          </p>
        </Grid>
        <Grid item md={6} xs={12}>
          {order.order.cart.products.map(product => (
            <ul>
              <li>
                <OrderProductItem key={product._id} product={product} />
              </li>
            </ul>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderItem;
