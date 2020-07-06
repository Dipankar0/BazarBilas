import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';

const OriginItem = ({ origin: { name, files, _id } }) => {
  return (
    <Fragment>
      <Grid item xs={6} md={3}>
        <Link to={`/products/${_id}`}>
          <img className='originImage' src={files[0]} alt='Origin' />
          <p style={{ textAlign: 'center' }}>{name}</p>
        </Link>
      </Grid>
    </Fragment>
  );
};

OriginItem.propTypes = {
  origin: PropTypes.object.isRequired
};

export default OriginItem;
