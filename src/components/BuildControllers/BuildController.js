import React from 'react';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient } from '../../redux';
import style from './BuildController.module.css';
import Controller from './Controller/Controller';
import PropTypes from 'prop-types';

const BuildController = (props) => {

  const keys = Object.keys(props.burger.ingredients);
  const domArray = [];

  keys.forEach(key => {
    domArray.push(
      <Controller
        key = {key}
        type = {key}
        qty = {props.burger.ingredients[key]}
        addIngredient = {props.addIngredient}
        removeIngredient = {props.removeIngredient} />
    );
  });

  return (
    <div className={style.container}>
      <h3 className={style.price}>Total Price : ${props.burger.totalPrice.toFixed(2)}</h3>
      {domArray}
      <button
        onClick = {props.toggleOrderModal}
        className = {style.orderButton}
        disabled = {props.burger.totalIngredients === 0}>
          CHECKOUT
      </button>
    </div>
  );
};

BuildController.propTypes = {
  toggleOrderModal: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    burger: state.burger
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredient => dispatch(addIngredient(ingredient)),
    removeIngredient: ingredient => dispatch(removeIngredient(ingredient))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildController);