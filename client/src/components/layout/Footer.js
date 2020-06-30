import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const Footer = props => {
  return (
    <div className='footer badge-primary'>
      <div>
        <p className='mid text-white text-center' style={{ paddingTop: '5px' }}>
          <a href='https://www.facebook.com/bazarbilas/'>
            Follow Us <i className='fab fa-facebook-square'></i>
          </a>
        </p>
        <p className='text-white text-center'>+8801841904994</p>
      </div>
      <div>
        <p style={{ textAlign: 'center' }}>@Copyright- 2020, Bazar Bilas</p>
      </div>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
