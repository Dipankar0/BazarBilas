import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyOrdersByState } from '../../actions/order';
import Spinner from '../layout/Spinner';
import OrderItem from './OrderItem';

const MyDeliveredOrderList = ({
  getMyOrdersByState,
  order: { orders, loading }
}) => {
  useEffect(() => {
    getMyOrdersByState('delivered');
  }, [getMyOrdersByState]);

  return (
    <Fragment>
      <div className=''>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <p className='mid text-deep'>
              <i class='fas fa-file-medical'></i> Pending Orders
            </p>

            <div>
              {orders.map(order => (
                <div className='my-1'>
                  <OrderItem key={order._id} order={order} />
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

MyDeliveredOrderList.propTypes = {
  getMyOrdersByState: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getMyOrdersByState })(
  MyDeliveredOrderList
);
