import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOriginsBySection } from '../../actions/origin';
import OriginItem from './OriginItem';

const GeneralOrigin = ({ getOriginsBySection, origin: { origins } }) => {
  useEffect(() => {
    getOriginsBySection('general');
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

GeneralOrigin.propTypes = {
  getOriginsBySection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  origin: state.origin
});

export default connect(mapStateToProps, { getOriginsBySection })(GeneralOrigin);
