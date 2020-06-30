import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyOrders } from '../../actions/order';
import Spinner from '../layout/Spinner';
import MyOrderItem from './MyOrderItem';

const MyOrderList = ({ getMyOrders, order: { orders, loading } }) => {
  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  return (
    <Fragment>
      <div className=''>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <p className='mid text-deep'>Orders</p>
            {orders && orders.length > 0 && (
              <div>
                {orders.map(order => (
                  <div className='my-1'>
                    <MyOrderItem key={order._id} order={order} />
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

MyOrderList.propTypes = {
  getMyOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getMyOrders })(MyOrderList);
