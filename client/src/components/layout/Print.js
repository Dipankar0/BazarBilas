import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { getOrderById, onOrderPrint } from '../../actions/order';

const Print = ({ order: { order }, getOrderById, onOrderPrint, match }) => {
  useEffect(() => {
    getOrderById(match.params.id);
  }, [getOrderById, match.params.id]);

  const onCick = e => {
    console.log(match.params.id);
    onOrderPrint(match.params.id);
  };

  return (
    <Fragment>
      {order && order && (
        <Fragment>
          <Grid container spacing={1} className='b-1'>
            <Grid item md={6} xs={12}>
              <p className='mid text-center badge-golden'>Customer: </p>
              <p className='text-deep'>Order ID: {order._id}</p>
              <p className='text-deep'>Name: {order.user.name}</p>
              <p className='text-deep'>Mobile: {order.user.phone}</p>
              <p className='text-deep'>Area: {order.location}</p>
              <p className='text-deep'>Thana: {order.thana}</p>
              <p className='text-red'>Total Price: {order.cart.total}</p>
              <p className='order-date'>
                Ordered on <Moment format='YYYY/MM/DD'>{order.date}</Moment>
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
                        <TableCell align='right'>
                          {product.product.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <button onClick={e => onCick(e)} className='btn btn-firm'>
            Print
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

Print.propTypes = {
  order: PropTypes.object.isRequired,
  getOrderById: PropTypes.func.isRequired,
  onOrderPrint: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getOrderById, onOrderPrint })(Print);
