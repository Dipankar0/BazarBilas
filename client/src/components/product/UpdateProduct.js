import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  updateProduct,
  getProductById,
  updateFiles,
  addHotSellByID,
  removeHotSellByID,
  makeItemNotAvailable
} from '../../actions/product';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import Alert from '../layout/Alert';

const initialState = {
  name: '',
  code: '',
  quantity: '',
  notPrice: '',
  price: '',
  description: ''
};

const UpdateProduct = ({
  product: { product, loading },
  updateProduct,
  getProductById,
  updateFiles,
  addHotSellByID,
  removeHotSellByID,
  makeItemNotAvailable,
  match,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [file, setFile] = useState('');

  useEffect(() => {
    if (!product) getProductById(match.params.id);
    if (!loading) {
      const productData = { ...initialState };
      for (const key in product) {
        if (key in productData) productData[key] = product[key];
      }
      setFormData(productData);
    }
  }, [getProductById, match.params.id, product, loading]);

  const { name, code, quantity, price, notPrice, description } = formData;

  const makeItemHotSell = e => {
    e.preventDefault();
    addHotSellByID(match.params.id);
  };

  const deleteItemHotSell = e => {
    e.preventDefault();
    removeHotSellByID(match.params.id);
  };

  const itemNotAvailable = e => {
    e.preventDefault();
    makeItemNotAvailable(match.params.id);
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = e => setFile(e.target.files);

  const onSubmit = e => {
    e.preventDefault();
    updateProduct(formData, match.params.id, history);
  };

  const onFileSubmit = e => {
    e.preventDefault();
    const fd = new FormData();
    for (const key of Object.keys(file)) {
      fd.append('file', file[key]);
    }
    updateFiles(fd, history);
  };

  return (
    <Fragment>
      <Alert />
      {product && product !== null && (
        <Fragment>
          <h1 className='large text-firm'>Update Product</h1>
          <p className='lead text-deep'>
            <i className='fas fa-user'></i> Update product's fileds
          </p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Product Name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Write the name of the product in details
              </small>
            </div>
            <div className='form-group'>
              <input
                type='number'
                placeholder='Product Code'
                name='code'
                value={code}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>Code number of product</small>
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Product Quantity'
                name='quantity'
                value={quantity}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>How much? Eg: 1kg</small>
            </div>
            <div className='form-group'>
              <input
                type='number'
                placeholder='Crossed Price'
                name='notPrice'
                value={notPrice}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>Put Crossed Price</small>
            </div>
            <div className='form-group'>
              <input
                type='number'
                placeholder='Product Price'
                name='price'
                value={price}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>What is the price?</small>
            </div>
            <div className='form-group'>
              <textarea
                placeholder='Product Details'
                name='description'
                value={description}
                onChange={e => onChange(e)}
              />
              <small className='form-text'>
                Write about the product in details
              </small>
            </div>
            <input type='submit' className='btn btn-primary' value='Create' />
          </form>
          <Fragment>
            <Carousel autoPlay={false}>
              {product.files.map(file => (
                <div>
                  <img
                    src={file}
                    style={{
                      width: '300px',
                      height: '300px',
                      margin: 'auto',
                      display: 'block'
                    }}
                    alt='Product'
                  />
                </div>
              ))}
            </Carousel>
            <form className='form' onSubmit={e => onFileSubmit(e)}>
              <div className='form-group'>
                <input
                  multiple
                  type='file'
                  placeholder='Images'
                  onChange={e => onFileChange(e)}
                />
                <small className='form-text'>Select Product Images</small>
              </div>
              <input type='submit' className='btn btn-primary' value='Create' />
            </form>
          </Fragment>
          <Fragment>
            {product && product.hotSell === 'yes' ? (
              <Fragment>
                {' '}
                <div className='my-1'>
                  <button
                    className='btn btn-red'
                    onClick={e => deleteItemHotSell(e)}
                  >
                    Delete Hot Sell
                  </button>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {' '}
                <div className='my-1'>
                  <button
                    className='btn btn-primary'
                    onClick={e => makeItemHotSell(e)}
                  >
                    Make Hot Sell
                  </button>
                </div>
              </Fragment>
            )}
          </Fragment>
          <Fragment>
            {product && product.available === 'yes' && (
              <Fragment>
                {' '}
                <div className='my-1'>
                  <button
                    className='btn btn-danger'
                    onClick={e => itemNotAvailable(e)}
                  >
                    Not Available
                  </button>
                </div>
              </Fragment>
            )}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

UpdateProduct.propTypes = {
  product: PropTypes.object.isRequired,
  updateProduct: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  updateFiles: PropTypes.func.isRequired,
  addHotSellByID: PropTypes.func.isRequired,
  removeHotSellByID: PropTypes.func.isRequired,
  makeItemNotAvailable: PropTypes.func.isRequired
};

const matStateToProps = state => ({
  product: state.product
});

export default connect(matStateToProps, {
  updateProduct,
  getProductById,
  updateFiles,
  addHotSellByID,
  removeHotSellByID,
  makeItemNotAvailable
})(UpdateProduct);
