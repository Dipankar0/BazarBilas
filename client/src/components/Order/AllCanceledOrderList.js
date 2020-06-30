import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllOrdersByState } from '../../actions/order';
import Spinner from '../layout/Spinner';
import OrderItem from './OrderItem';

const AllCanceledOrderList = ({
  getAllOrdersByState,
  order: { orders, loading }
}) => {
  useEffect(() => {
    getAllOrdersByState('canceled');
  }, [getAllOrdersByState]);

  return (
    <Fragment>
      <div className=''>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <p className='mid text-deep'>
              <i class='fas fa-file-medical'></i> Canceled Orders
            </p>
            {orders && orders.length > 0 && (
              <div>
                {orders.map(order => (
                  <div className='my-1'>
                    <OrderItem key={order._id} order={order} />
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

AllCanceledOrderList.propTypes = {
  getAllOrdersByState: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getAllOrdersByState })(
  AllCanceledOrderList
);
