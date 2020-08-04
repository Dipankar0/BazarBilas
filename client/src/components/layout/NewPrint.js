import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getOrderById } from '../../actions/order';
import { connect } from 'react-redux';
import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@material-ui/core';
import Moment from 'react-moment';

const NewPrint = ({ order: { order }, getOrderById, match }) => {
  useEffect(() => {
    getOrderById(match.params.id);
  }, [getOrderById, match.params.id]);

  const generatePDF = order => {
    const doc = new jsPDF();

    const bazarCl = [
      'www.bazarbilas.com',
      '+8801841904994',
      'bazarbilas@gmail.com'
    ];

    const bazarRow = [];

    const shipTableCl = ['Phone', 'Area', 'Thana'];

    const shipRow = [];

    const shipData = [order.phone, order.location, order.thana];
    shipRow.push(shipData);

    const tableColumn = ['Product', 'Portion', 'Quantity', 'Price'];

    const tableRows = [];

    order.cart.products.map(product => {
      const productData = [
        product.product.name,
        product.product.quantity,
        product.count,
        product.product.price
      ];
      tableRows.push(productData);
    });

    doc.autoTable(bazarCl, bazarRow, { startY: 20 });
    doc.autoTable(shipTableCl, shipRow, { startY: 115 });
    doc.autoTable(tableColumn, tableRows, { startY: 135 });

    doc.setFontSize(22);
    doc.text('Bazar Bilas', 14, 15);

    doc.setFontSize(10);
    doc.text(`Customer Name: ${order.user.name}`, 14, 35);
    doc.text(`Customer Mobile: ${order.user.phone}`, 14, 45);
    doc.text(`Invoice Number: ${order._id}`, 14, 55);
    doc.text(`Order date: ${order.date}`, 14, 65);
    doc.text(`Payment type: Cash On Delivery`, 14, 75);

    doc.setFontSize(15);
    doc.text('Ship to', 14, 110);

    doc.setFontSize(20);
    doc.setTextColor(255, 0, 0);
    doc.text(`Product Price: ${order.cart.total}`, 14, 85);
    doc.text(`Delivery Price: ${order.deliveryCost}`, 14, 95);

    doc.save('test.pdf');
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
                    {order.cart.products.map(product => (
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
          <button onClick={e => generatePDF(order)} className='btn btn-firm'>
            Print
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

NewPrint.propTypes = {
  order: PropTypes.object.isRequired,
  getOrderById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getOrderById })(NewPrint);
