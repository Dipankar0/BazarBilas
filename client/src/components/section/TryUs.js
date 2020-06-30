import React, { Fragment, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';
import img from '../../img/landingPromo.jpg';
import { getOriginsBySection } from '../../actions/origin';
import OriginItem from '../origin/OriginItem';

const TryUs = ({ getOriginsBySection, origin: { origins } }) => {
  useEffect(() => {
    getOriginsBySection('tryus');
  }, [getOriginsBySection]);

  return (
    <div>
      <div>
        <Carousel autoPlay={false}>
          <div>
            <img
              style={{ width: '100%', height: '200px' }}
              src={img}
              alt='Origin'
            />
          </div>
          <div>
            <img
              style={{ width: '100%', height: '200px' }}
              src={img}
              alt='Origin'
            />
          </div>
        </Carousel>
      </div>
      <div>
        <div>
          <p style={{ textAlign: 'center' }} className='badge-golden mid'>
            Try Us Section
          </p>
        </div>
        <Fragment>
          {origins && origins.length > 0 && (
            <Fragment>
              <Grid container spacing={3}>
                {origins.map(origin => (
                  <Fragment>
                    {origin.section === 'tryus' && (
                      <OriginItem key={origin._id} origin={origin} />
                    )}
                  </Fragment>
                ))}
              </Grid>
            </Fragment>
          )}
        </Fragment>
      </div>{' '}
      <Footer />
    </div>
  );
};

TryUs.propTypes = {
  getOriginsBySection: PropTypes.func.isRequired,
  origin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  origin: state.origin
});

export default connect(mapStateToProps, { getOriginsBySection })(TryUs);
