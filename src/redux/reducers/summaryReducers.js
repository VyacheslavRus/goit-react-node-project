import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import summaryActions from '../actions/summaryActions';
import transactionsActions from '../actions/transactionsActions';
import authActions from '../actions/authActions';
import transactionDeleteActions from '../actions/transactionDeleteActions';

const months = {
  '01': 'jan',
  '02': 'feb',
  '03': 'mar',
  '04': 'apr',
  '05': 'may',
  '06': 'jun',
  '07': 'jul',
  '08': 'aug',
  '09': 'sep',
  10: 'oct',
  11: 'nov',
  12: 'dec',
};

const initialState = {};

const income = createReducer(initialState, {
  [summaryActions.summaryGetIncomeSuccess]: (_, { payload }) => payload,
  [transactionsActions.incomePostSuccess]: (state, { payload }) => {
    const transMonth = payload.transaction.date.split('.')[1];
    return {
      ...state,
      [months[transMonth]]: state[months[transMonth]] + payload.transaction.sum,
    };
  },
  [transactionDeleteActions.transactionIncomeDeleteSuccess]: (state, { payload }) => {
    const transMonth = payload.transaction.date.split('.')[1];
    return {
      ...state,
      [months[transMonth]]: state[months[transMonth]] - payload.transaction.sum,
    };
  },
  [authActions.logOutSuccess]: (_, __) => initialState,
});

const expense = createReducer(initialState, {
  [summaryActions.summaryGetExpenseSuccess]: (_, { payload }) => payload,
  [transactionsActions.expensePostSuccess]: (state, { payload }) => {
    const transMonth = payload.transaction.date.split('.')[1];
    return {
      ...state,
      [months[transMonth]]: state[months[transMonth]] + payload.transaction.sum,
    };
  },
  [transactionDeleteActions.transactionExpenceDeleteSuccess]: (state, { payload }) => {
    const transMonth = payload.transaction.date.split('.')[1];
    return {
      ...state,
      [months[transMonth]]: state[months[transMonth]] - payload.transaction.sum,
    };
  },
  [authActions.logOutSuccess]: (_, __) => initialState,
});

export default combineReducers({
  income,
  expense,
});
