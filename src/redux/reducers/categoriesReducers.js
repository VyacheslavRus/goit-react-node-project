import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from '../actions/categoriesActions';

const incomes = createReducer([], {
  [actions.incomeCategSuccess]: (_, { payload }) => payload.categories,
});

const expenses = createReducer([], {
  [actions.expenseCategSuccess]: (_, { payload }) => payload.categories,
});

export default combineReducers({
  incomes,
  expenses,
});
