import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

const Button = (props) => {
  return (
    <button
      onClick = {props.clickHandler}
      className={[style.button, style[props.type]].join(' ')}>
        {props.name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired
}

export default Button;
