import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOrigin } from '../../actions/origin';
import Alert from '../layout/Alert';

const CreateOrigin = ({ addOrigin, history }) => {
  const [formDate, setFormData] = useState({
    name: '',
    section: ''
  });

  const [file, setFile] = useState('');

  const { name, section } = formDate;

  const onChange = e =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });

  const onFileChange = e => setFile(e.target.files);

  const onSubmit = e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    fd.append('section', section);
    for (const key of Object.keys(file)) {
      fd.append('file', file[key]);
    }
    addOrigin(fd, history);
  };

  return (
    <Fragment>
      <Alert />
      <h1 className='large text-firm'>Add Origin</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Add a new origin
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Origin Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Write origin name</small>
        </div>
        <div className='form-group'>
          <select name='section' value={section} onChange={e => onChange(e)}>
            <option value='0'>* Select Section</option>
            <option value='organic'>Organic</option>
            <option value='general'>General</option>
            <option value='tryus'>Try</option>
          </select>
          <small className='form-text'>Please select correctly</small>
        </div>
        <div className='form-group'>
          <input
            multiple
            type='file'
            placeholder='Images'
            onChange={e => onFileChange(e)}
          />
          <small className='form-text'>Select Origin Images</small>
        </div>
        <input type='submit' className='btn btn-firm' value='Create' />
      </form>
    </Fragment>
  );
};

CreateOrigin.propTypes = {
  addOrigin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addOrigin })(CreateOrigin);
