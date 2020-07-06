import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductsByOrigin } from '../../actions/product';
import { getOriginById } from '../../actions/origin';
import ProductItem from './ProductItem';
import { Grid } from '@material-ui/core';
import img from '../../img/landingPromo.jpg';

const ProductList = ({
  getOriginById,
  getProductsByOrigin,
  origin: { origin },
  product: { products },
  auth: { isAuthenticated, user },
  match
}) => {
  useEffect(() => {
    getProductsByOrigin(match.params.id);
    getOriginById(match.params.id);
  }, [getProductsByOrigin, getOriginById, match.params.id]);

  return (
    <Fragment>
      {isAuthenticated && user && user.phone === '01312456526' && (
        <Fragment>
          <Link to={`/updateorigin/${match.params.id}`}>Edit Origin</Link>
        </Fragment>
      )}
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
    </Fragment>
  );
};

ProductList.propTypes = {
  origin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductsByOrigin: PropTypes.func.isRequired,
  getOriginById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  origin: state.origin,
  auth: state.auth,
  product: state.product
});

export default connect(mapStateToProps, { getProductsByOrigin, getOriginById })(
  ProductList
);
