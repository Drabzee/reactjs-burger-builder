import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_BURGER } from './burgerTypes';

const INGREDIENTS_PRICE = {
  cheese: 2.99,
  bacon: 4.99,
  meat: 7.49,
  salad: 1.49
}

const initialState = {
  ingredients : {
    cheese: 0,
    bacon: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 0,
  totalIngredients: 0,
}

const burgerReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.payload],
        totalIngredients: state.totalIngredients + 1
      }
    case REMOVE_INGREDIENT:
      return state.ingredients[action.payload] ? {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.payload],
        totalIngredients: state.totalIngredients - 1
      } : state
    case RESET_BURGER:
      return {
        ...initialState
      }
    default: return state
  }
}

export default burgerReducer;