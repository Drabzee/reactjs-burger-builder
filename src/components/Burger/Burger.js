import React from 'react';
import { connect } from 'react-redux';
import style from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {

  const keys = Object.keys(props.burger.ingredients);
  const domArray = [];

  keys.forEach(key => {
    for(let i=1 ; i<=props.burger.ingredients[key] ; i++) {
      domArray.push(<BurgerIngredient key={key+i} type={key} />);
    }
  });

  return (
    <div className={style.burger}>
      <BurgerIngredient type="bread-top" />
      { domArray.length > 0 ? domArray : <h4 className={style.label}>Please start adding ingredients!</h4> }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    burger: state.burger
  }
}

export default connect(mapStateToProps, null)(Burger);
