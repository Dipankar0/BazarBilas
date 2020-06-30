import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@material-ui/core';

const OrderProductItem = product => {
  return (
    <div className=''>
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
            <TableRow>
              <TableCell component='th' scope='row'>
                {product.product.product.name}
              </TableCell>
              <TableCell align='right'>
                {product.product.product.quantity}
              </TableCell>
              <TableCell align='right'>{product.product.count}</TableCell>
              <TableCell align='right'>
                {product.product.product.price}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

OrderProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default OrderProductItem;
