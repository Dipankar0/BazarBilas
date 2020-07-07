import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@material-ui/core';

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
          <p className='mid text-center badge-golden'>Product: </p>
          <TableContainer>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align='right'>Portion</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                  <TableCell align='right'>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.order.cart.products.map(product => (
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      {product.product.name}
                    </TableCell>
                    <TableCell align='right'>
                      {product.product.quantity}
                    </TableCell>
                    <TableCell align='right'>{product.count}</TableCell>
                    <TableCell align='right'>{product.product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderItem;
