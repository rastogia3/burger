import * as actionTypes from '../actions/actions';
import { updateObject } from "../../shared/utility"
const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
}
const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1.5,
    bacon: 0.7
}
const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updateState = {
        building: true,
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    }
    return updateObject(state, updateState)
}
const removeIngredient = (state, action) => {
    const updateIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updateIngs = updateObject(state.ingredients, updateIng);
    const updateSt = {
        building: true,
        ingredients: updateIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    }
    return updateObject(state, updateSt)
}
const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese
        },
        totalPrice: 2,
        error: false,
        building: false
    })
}

const fetchIngredientFail = (state) => {
    return updateObject(state, { error: true })
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientFail(state)
        default: return state;
    }
}

export default burgerBuilder;