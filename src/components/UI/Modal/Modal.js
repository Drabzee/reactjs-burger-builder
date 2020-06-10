import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  return (
    !props.hidden ? <Fragment>
      <Backdrop />
      <div className={style.modal}>{props.children}</div>
    </Fragment> : null
  );
}

Modal.propTypes = {
  hidden: PropTypes.bool.isRequired
}

export default Modal;
