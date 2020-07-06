import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';

const ProductAbout = ({
  product: { _id, name, price, description, files }
}) => {
  return (
    <div className=''>
      {files.length > 1 ? (
        <Fragment>
          <Carousel
            autoPlay={false}
            indicators={false}
            navButtonsAlwaysVisible={true}
            className='b-1 text-center'
          >
            {files.map(file => (
              <div className=''>
                <img src={file} alt='Product' className='imageProduct' />
              </div>
            ))}
          </Carousel>
        </Fragment>
      ) : (
        <Fragment>
          <img src={files[0]} alt='Origin' className='imageProduct' />
        </Fragment>
      )}
    </div>
  );
};

ProductAbout.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductAbout;
