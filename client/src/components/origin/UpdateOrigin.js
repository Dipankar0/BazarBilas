import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  updateOrigin,
  getOriginById,
  updateFiles,
  addLandingByID,
  removeLandingByID,
  makeOriginNotAvailable
} from '../../actions/origin';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import Alert from '../layout/Alert';

const initialState = {
  name: '',
  section: ''
};

const UpdateOrigin = ({
  origin: { origin, loading },
  updateOrigin,
  getOriginById,
  updateFiles,
  addLandingByID,
  removeLandingByID,
  makeOriginNotAvailable,
  match,
  fileId,
  history
}) => {
  if (origin) {
    fileId = origin._id;
  }

  const [formData, setFormData] = useState(initialState);

  const [file, setFile] = useState('');

  useEffect(() => {
    if (!origin) getOriginById(match.params.id);
    if (!loading) {
      const originData = { ...initialState };
      for (const key in origin) {
        if (key in originData) originData[key] = origin[key];
      }
      setFormData(originData);
    }
  }, [getOriginById, match.params.id, origin, loading]);

  const { name, section } = formData;

  const setOriginLanding = e => {
    e.preventDefault();
    addLandingByID(match.params.id);
  };

  const deleteOriginLanding = e => {
    e.preventDefault();
    removeLandingByID(match.params.id);
  };

  const originNotAvailable = e => {
    e.preventDefault();
    makeOriginNotAvailable(match.params.id);
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = e => setFile(e.target.files);

  const onSubmit = e => {
    e.preventDefault();
    updateOrigin(formData, match.params.id, history);
  };

  const onFileSubmit = e => {
    e.preventDefault();
    const fd = new FormData();
    for (const key of Object.keys(file)) {
      fd.append('file', file[key]);
    }
    updateFiles(fd, fileId, history);
  };

  return (
    <Fragment>
      <Alert />
      {origin && origin !== null && (
        <Fragment>
          <h1 className='large text-firm'>Update Origin</h1>
          <p className='lead text-deep'>
            <i className='fas fa-user'></i> Update origin's fileds
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
              <select
                name='section'
                value={section}
                onChange={e => onChange(e)}
              >
                <option value='0'>* Select Section</option>
                <option value='organic'>Organic</option>
                <option value='general'>General</option>
                <option value='tryus'>Try</option>
              </select>
              <small className='form-text'>Please select correctly</small>
            </div>
            <input type='submit' className='btn btn-firm' value='Create' />
          </form>
          <Fragment>
            <Carousel autoPlay={false}>
              {origin.files.map(file => (
                <div>
                  <img
                    src={file}
                    style={{
                      width: '300px',
                      height: '300px',
                      margin: 'auto',
                      display: 'block'
                    }}
                    alt='origin'
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
                <small className='form-text'>Select Origin Images</small>
              </div>
              <input type='submit' className='btn btn-firm' value='Create' />
            </form>
          </Fragment>
          <Fragment>
            {origin && origin.landing === 'yes' ? (
              <Fragment>
                {' '}
                <div className='my-1'>
                  <button
                    className='btn btn-red'
                    onClick={e => deleteOriginLanding(e)}
                  >
                    Delete Landing
                  </button>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {' '}
                <div className='my-1'>
                  <button
                    className='btn btn-firm'
                    onClick={e => setOriginLanding(e)}
                  >
                    Make Landing
                  </button>
                </div>
              </Fragment>
            )}
          </Fragment>
          <Fragment>
            {origin && origin.available === 'yes' && (
              <Fragment>
                {' '}
                <div className='my-1'>
                  <button
                    className='btn btn-danger'
                    onClick={e => originNotAvailable(e)}
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

UpdateOrigin.propTypes = {
  origin: PropTypes.object.isRequired,
  updateOrigin: PropTypes.func.isRequired,
  getOriginById: PropTypes.func.isRequired,
  updateFiles: PropTypes.func.isRequired,
  addLandingByID: PropTypes.func.isRequired,
  removeLandingByID: PropTypes.func.isRequired,
  makeOriginNotAvailable: PropTypes.func.isRequired
};

const matStateToProps = state => ({
  origin: state.origin
});

export default connect(matStateToProps, {
  updateOrigin,
  getOriginById,
  updateFiles,
  addLandingByID,
  removeLandingByID,
  makeOriginNotAvailable
})(UpdateOrigin);
