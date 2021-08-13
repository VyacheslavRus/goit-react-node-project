import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from '../actions/transactionsActions';
import actionAuth from '../actions/authActions';
import actionDelete from '../actions/transactionDeleteActions';

const initialState = [];

const incomes = createReducer(initialState, {
  [actions.incomeGetSuccess]: (_, { payload }) => payload,
  [actions.incomePostSuccess]: (state, { payload }) => [
    ...state,
    payload.transaction,
  ],
  [actionDelete.transactionIncomeDeleteSuccess]: (state, { payload }) =>
    state.filter(item => item.id !== payload.transaction.id),
  [actionAuth.logOutSuccess]: (_, __) => initialState,
});

const expenses = createReducer(initialState, {
  [actions.expenseGetSuccess]: (_, { payload }) => payload,
  [actions.expensePostSuccess]: (state, { payload }) => [
    ...state,
    payload.transaction,
  ],
  [actionDelete.transactionExpenceDeleteSuccess]: (state, { payload }) =>
    state.filter(item => item.id !== payload.transaction.id),
  [actionAuth.logOutSuccess]: (_, __) => initialState,
});

export default combineReducers({
  incomes,
  expenses,
});
