import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './OrderSummary.module.css';
import Button from '../UI/Button/Button';

const OrderSummary = (props) => {

  const keys = Object.keys(props.burger.ingredients);

  const domArray = keys.map(key => <li key={key}>{key}: {props.burger.ingredients[key]}</li>);

  const continueClickHandler = () => {
    props.toggleOrderModal();
    props.history.push('/burger/checkout');
  };

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p className={style.description}>A delicios order with following ingredients:</p>
      <ul className={style.ingredientsList}>
        {domArray}
      </ul>
        <h4 className={style.price}>Total Price : ${props.burger.totalPrice.toFixed(2)}</h4>
      <p className={style.description}>Continue to checkout?</p>
      <Button clickHandler={continueClickHandler} type="success" name="CONTINUE" />
      <Button clickHandler={props.toggleOrderModal} type="danger" name="CANCEL" />
    </Fragment>
  );
}

OrderSummary.propTypes = {
  toggleOrderModal: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    burger: state.burger
  }
}

export default connect(mapStateToProps,null)(OrderSummary);