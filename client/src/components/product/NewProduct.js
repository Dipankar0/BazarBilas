import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct } from '../../actions/product';
import { getOriginsBySection } from '../../actions/origin';
import Alert from '../layout/Alert';

const NewProduct = ({
  addProduct,
  getOriginsBySection,
  isAuthenticated,
  origin: { origins },
  history
}) => {
  const [formDate, setFormData] = useState({
    name: '',
    code: '',
    quantity: '',
    originId: '',
    price: '',
    notPrice: '',
    description: '',
    section: ''
  });

  const [file, setFile] = useState('');

  const {
    name,
    code,
    quantity,
    originId,
    notPrice,
    price,
    description,
    section
  } = formDate;

  const onChange = e =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });

  const onSectionChange = e => {
    getOriginsBySection(e.target.value);
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  };

  const onFileChange = e => setFile(e.target.files);

  const onSubmit = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    fd.append('code', code);
    fd.append('quantity', quantity);
    fd.append('originId', originId);
    fd.append('price', price);
    fd.append('notPrice', notPrice);
    fd.append('description', description);
    for (const key of Object.keys(file)) {
      fd.append('file', file[key]);
    }
    console.log(fd);
    addProduct(fd, history);
  };

  return (
    <Fragment>
      <Alert />
      <h1 className='large text-firm'>Add Product</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Add a new product
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='section'
            value={section}
            onChange={e => onSectionChange(e)}
          >
            <option value='0'>* Select Section</option>
            <option value='organic'>Organic</option>
            <option value='general'>General</option>
            <option value='tryus'>Try</option>
          </select>
          <small className='form-text'>Please select correctly</small>
        </div>
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
            type='text'
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
          <small className='form-text'>Put Canceled Price</small>
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
            placeholder='Product Description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Write about the product in details
          </small>
        </div>
        <div className='form-group'>
          <Fragment>
            {origins !== null && origins.length > 0 ? (
              <Fragment>
                <select
                  name='originId'
                  onChange={e => {
                    onChange(e);
                  }}
                >
                  <option value='0'>Origin</option>
                  {origins.map(origin => (
                    <option
                      key={origin && origin._id}
                      value={origin && origin._id}
                    >
                      {origin && origin.name}
                    </option>
                  ))}
                </select>
                <small className='form-text'>
                  Select one origin from the list
                </small>
              </Fragment>
            ) : (
              <Fragment>
                <select>
                  <option value='0'>Origin</option>
                </select>
              </Fragment>
            )}
          </Fragment>
        </div>
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
  );
};

NewProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
  getOriginsBySection: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  product: PropTypes.object.isRequired,
  origin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  origin: state.origin,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addProduct, getOriginsBySection })(
  withRouter(NewProduct)
);
