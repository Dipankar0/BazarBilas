import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';
import img from '../../img/landingPromo.jpg';
import { getAllOrigins } from '../../actions/origin';
import OriginItem from '../origin/OriginItem';
import HotSellingProduct from '../product/HotSellingProduct';

const Landing = ({ getAllOrigins, origin: { origins } }) => {
  useEffect(() => {
    getAllOrigins();
  }, [getAllOrigins]);

  return (
    <Fragment>
      <div>
        <div>
          <img className='image' src={img} alt='Promo' />
        </div>
      </div>
      <div>
        <div className='my-2'>
          <p style={{ textAlign: 'center' }} className='badge-golden mid'>
            Organic Section
          </p>
        </div>
        <Fragment>
          {origins && origins.length > 0 && (
            <Fragment>
              <Grid container spacing={1}>
                {origins.map(origin => (
                  <Fragment>
                    {origin.section === 'organic' &&
                      origin.landing === 'yes' && (
                        <OriginItem key={origin._id} origin={origin} />
                      )}
                  </Fragment>
                ))}
              </Grid>
              <div style={{ textAlign: 'center' }}>
                <Link to='/organic'>
                  <button className='btn btn-primary'>View All</button>
                </Link>
              </div>
            </Fragment>
          )}
        </Fragment>
      </div>
      <div className='my-2'>
        <div className='my-2'>
          <p style={{ textAlign: 'center' }} className='badge-golden mid'>
            Try Us First
          </p>
        </div>
        <Fragment>
          {origins && origins.length > 0 && (
            <Fragment>
              <Grid container spacing={1}>
                {origins.map(origin => (
                  <Fragment>
                    {origin.section === 'tryus' && origin.landing === 'yes' && (
                      <OriginItem key={origin._id} origin={origin} />
                    )}
                  </Fragment>
                ))}
              </Grid>
              <div style={{ textAlign: 'center' }}>
                <Link to='/tryus'>
                  <button className='btn btn-primary'>View All</button>
                </Link>
              </div>
            </Fragment>
          )}
        </Fragment>
      </div>
      <div className='my-2'>
        <div className='my-2'>
          <p style={{ textAlign: 'center' }} className='badge-golden mid'>
            General Section
          </p>
        </div>
        <Fragment>
          {origins && origins.length > 0 && (
            <Fragment>
              <Grid container spacing={1}>
                {origins.map(origin => (
                  <Fragment>
                    {origin.section === 'general' &&
                      origin.landing === 'yes' && (
                        <OriginItem key={origin._id} origin={origin} />
                      )}
                  </Fragment>
                ))}
              </Grid>
              <div style={{ textAlign: 'center' }}>
                <Link to='/general'>
                  <button className='btn btn-primary'>View All</button>
                </Link>
              </div>
            </Fragment>
          )}
        </Fragment>
      </div>
      <div>
        <HotSellingProduct />
      </div>
      <div>
        <div>
          <p style={{ textAlign: 'center' }} className='badge-golden mid'>
            Why People Like Bazar Bilas
          </p>
        </div>
        <div>
          <Carousel
            autoPlay={true}
            indicators={false}
            animation='fade'
            timeout={500}
          >
            <div>
              <img className='image' src={img} alt='Promo' />
            </div>
            <div>
              <img className='image' src={img} alt='Promo' />
            </div>
          </Carousel>
        </div>
      </div>
      <div>
        <div>
          <p style={{ textAlign: 'center' }} className='badge-golden mid'>
            Our Vision
          </p>
        </div>
        <div>
          <Carousel
            autoPlay={true}
            indicators={false}
            animation='fade'
            timeout={500}
          >
            <div>
              <img className='image' src={img} alt='Promo' />
            </div>
            <div>
              <img className='image' src={img} alt='Promo' />
            </div>
          </Carousel>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Landing.propTypes = {
  getAllOrigins: PropTypes.func.isRequired,
  origin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  origin: state.origin
});

export default connect(mapStateToProps, { getAllOrigins })(Landing);
