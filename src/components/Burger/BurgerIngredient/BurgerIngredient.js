import React from 'react';
import style from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import breadTopPic from '../../../assets/burger-bun-top.png';
import breadBottomPic from '../../../assets/burger-bun-bottom.png';

const BurgerIngredient = (props) => {
  let ingredient = null;
  
  switch(props.type) {
    case ('bread-bottom'):
      ingredient = <img className={style.breadBottom} src={breadBottomPic} alt="Bread Bottom" />
      break;
    case ('bread-top'):
      ingredient = <img className={style.breadTop} src={breadTopPic} alt="Bread Bottom" />
      break;
    case ('meat'):
      ingredient = <div className={style.meat} />
      // ingredient = <img className={style.meat} src={meatPic} alt="Meat" />
      break;
    case ('bacon'):
      ingredient = <div className={style.bacon} />
      // ingredient = <img className={style.bacon} src={baconPic} alt="Bacon" />
      break;
    case ('cheese'):
      ingredient = <div className={style.cheese} />
      // ingredient = <img className={style.cheese} src={cheesePic} alt="Cheese" />
      break;
    case ('salad'):
      ingredient = <div className={style.salad} />
      break;
    default:
      ingredient = null;
  }
  
  return ingredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient
