import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import generatePDF from './Print2';
import { getOrderById } from '../../actions/order';

const Print3 = ({ order: { order }, getOrderById, match }) => {
  useEffect(() => {
    getOrderById(match.params.id);
  }, [getOrderById, match.params.id]);

  return <div></div>;
};

Print3.propTypes = {
  order: PropTypes.object.isRequired,
  getOrderById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getOrderById, onOrderPrint })(Print3);
