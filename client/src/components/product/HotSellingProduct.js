import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getHotSells } from '../../actions/product';
import ProductItem from './ProductItem';

const HotSellingProduct = ({ getHotSells, product: { products } }) => {
  useEffect(() => {
    getHotSells();
  }, [getHotSells]);

  return (
    <div>
      <div className='my-2'>
        <p style={{ textAlign: 'center' }} className='badge-golden mid'>
          Hot Selling Products
        </p>
      </div>
      <Fragment>
        <Grid container spacing={1}>
          {products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Grid>
      </Fragment>
    </div>
  );
};

HotSellingProduct.propTypes = {
  getHotSells: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getHotSells })(HotSellingProduct);
