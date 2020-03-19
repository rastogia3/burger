import axios from '../../axios-order';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* initIngredientsSagas(action) {
    try {
        const ingredientsResponse = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(ingredientsResponse.data))
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}