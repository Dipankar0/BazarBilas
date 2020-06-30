import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrderById, onCanceled } from '../../actions/order';

const ConfirmOrder = ({
  order: { order },
  getOrderById,
  onCanceled,
  match,
  history
}) => {
  useEffect(() => {
    getOrderById(match.params.id);
  }, [getOrderById, match.params.id]);

  const onCancel = id => {
    onCanceled(id, history);
  };

  return (
    <Fragment>
      {order && order && (
        <Fragment>
          <div className='m-2'>
            <p className='mid'>Your order is succefully placed</p>
            <p className='lead'>Order Id: {order._id}</p>
            <button
              onClick={e => onCancel(order._id)}
              className='btn btn-red py-1'
            >
              Canceled
            </button>
            <Link to='/' className='btn btn-firm py-1'>
              Continue Shopping
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ConfirmOrder.propTypes = {
  order: PropTypes.object.isRequired,
  getOrderById: PropTypes.func.isRequired,
  onCanceled: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getOrderById, onCanceled })(
  ConfirmOrder
);
