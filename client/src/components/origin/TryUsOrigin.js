import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOriginsBySection } from '../../actions/origin';
import OriginItem from './OriginItem';

const TryUsOrigin = ({ getOriginsBySection, origin: { origins } }) => {
  useEffect(() => {
    getOriginsBySection('tryus');
  }, [getOriginsBySection]);
  return (
    <Fragment>
      {origins && origins.length > 0 && (
        <Fragment>
          {origins.map(origin => (
            <OriginItem key={origin._id} origin={origin} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

TryUsOrigin.propTypes = {
  getOriginsBySection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  origin: state.origin
});

export default connect(mapStateToProps, { getOriginsBySection })(TryUsOrigin);
