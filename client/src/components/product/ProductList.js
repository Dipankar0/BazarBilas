import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductsByOrigin } from '../../actions/product';
import ProductItem from './ProductItem';
import { Grid } from '@material-ui/core';
import img from '../../img/landingPromo.jpg';

const ProductList = ({ getProductsByOrigin, product: { products }, match }) => {
  useEffect(() => {
    getProductsByOrigin(match.params.id);
  }, [getProductsByOrigin, match.params.id]);

  return (
    <Fragment>
      <div>
        <img className='image' src={img} alt='Promo' />
      </div>
      <Grid container spacing={1}>
        {products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </Grid>
    </Fragment>
  );
};

ProductList.propTypes = {
  product: PropTypes.object.isRequired,
  getProductsByOrigin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProductsByOrigin })(ProductList);
