import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAllOrdersByState,
  onDelivered,
  onReturned
} from '../../actions/order';
import Spinner from '../layout/Spinner';
import OrderItem from './OrderItem';

const AllSentOrderList = ({
  getAllOrdersByState,
  onDelivered,
  order: { orders, loading }
}) => {
  useEffect(() => {
    getAllOrdersByState('sent');
  }, [getAllOrdersByState]);

  const onDelivery = id => {
    onDelivered(id);
  };

  return (
    <Fragment>
      <div className=''>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <p className='mid text-deep'>
              <i class='fas fa-file-medical'></i> Sent Orders
            </p>
            {orders && orders.length > 0 && (
              <div>
                {orders && orders.length > 0 && (
                  <div>
                    {orders.map(order => (
                      <div className='my-1'>
                        <OrderItem key={order._id} order={order} />
                        <div className=''>
                          <button
                            onClick={e => onDelivery(order._id)}
                            className='btn btn-red'
                          >
                            Delivered
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

AllSentOrderList.propTypes = {
  getAllOrdersByState: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  onDelivered: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, {
  getAllOrdersByState,
  onDelivered
})(AllSentOrderList);
