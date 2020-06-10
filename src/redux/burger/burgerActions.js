import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_BURGER } from './burgerTypes';

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient
  }
}

export const removeIngredient = (ingredient) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: ingredient
  }
}

export const resetBurger = () => {
  return {
    type: RESET_BURGER
  }
}