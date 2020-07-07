import React from 'react';
import PropTypes from 'prop-types';
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

const MyOrderItem = order => {
  return (
    <div>
      <Grid container spacing={1} className='b-1'>
        <Grid item md={6} xs={12}>
          <p className='mid text-center badge-golden'>Customer: </p>
          <p className='text-deep'>Order ID: {order.order._id}</p>
          {order.order.state === 'sent' ? (
            <p className='lead text-red'>On the way</p>
          ) : (
            <p className='lead text-red'>{order.order.state}</p>
          )}
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

MyOrderItem.propTypes = {
  order: PropTypes.object.isRequired
};

export default MyOrderItem;
