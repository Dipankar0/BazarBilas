import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllOrdersByState, onSent, onCanceled } from '../../actions/order';
import Spinner from '../layout/Spinner';
import OrderItem from './OrderItem';

const AllProcessingOrderList = ({
  getAllOrdersByState,
  onSent,
  onCanceled,
  auth: { user },
  order: { orders, loading },
  history
}) => {
  useEffect(() => {
    getAllOrdersByState('processing');
  }, [getAllOrdersByState]);

  const onSend = id => {
    onSent(id);
  };
  const onCancel = id => {
    onCanceled(id, history);
  };

  return (
    <Fragment>
      <div className=''>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {user && user.phone === '01312456526' && (
              <Fragment>
                <p className='mid text-deep'>
                  <i class='fas fa-file-medical'></i> Pending Orders
                </p>
                {orders && orders.length > 0 && (
                  <div>
                    {orders.map(order => (
                      <div className='my-1'>
                        <OrderItem key={order._id} order={order} />
                        <div className='inline'>
                          <button
                            onClick={e => onSend(order._id)}
                            className='btn btn-red'
                          >
                            Sent
                          </button>
                          <button
                            onClick={e => onCancel(order._id)}
                            className='btn btn-red'
                          >
                            Canceled
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

AllProcessingOrderList.propTypes = {
  getAllOrdersByState: PropTypes.func.isRequired,
  onSent: PropTypes.func.isRequired,
  onCanceled: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getAllOrdersByState,
  onSent,
  onCanceled
})(AllProcessingOrderList);
