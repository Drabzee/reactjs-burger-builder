import React from 'react';
import style from './Controller.module.css';
import PropTypes from 'prop-types';

const Controller = (props) => {
  return (
    <div className={style.container}>
      <h4 className={style.label}>{props.type}</h4>
      <div className={style.controller}>
        <button onClick={() => props.removeIngredient(props.type)} className={style.removeButton}>
          <span className={"material-icons " + style.removeIcon}>remove</span>
        </button>
        <h5 className={style.qty}>{props.qty}</h5>
        <button onClick={() => props.addIngredient(props.type)} className={style.addButton}>
          <span className={"material-icons " + style.addIcon}>add</span>
        </button>
      </div>
    </div>
  );
};

Controller.protoTypes = {
  type: PropTypes.string.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  qty: PropTypes.number.isRequired
}

export default Controller;