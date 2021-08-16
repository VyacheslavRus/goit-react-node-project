import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from '../actions/authActions';
import balanceActions from '../actions/balanceActions';
import transactionsActions from '../actions/transactionsActions';
import actionDelete from '../actions/transactionDeleteActions';
import summaryActions from '../actions/summaryActions';

const userInitialState = {};
const user = createReducer(userInitialState, {
  [authActions.logInSuccess]: (_, { payload }) => ({
    email: payload.email,
    type: payload.type,
    balance: payload.balance,
  }),
  [authActions.logOutSuccess]: () => userInitialState,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
  [balanceActions.addBalanceSuccess]: (state, { payload }) => ({
    ...state,
    balance: payload.balance,
  }),
  [transactionsActions.incomePostSuccess]: (state, { payload }) => ({
    ...state,
    balance: state.balance + payload.transaction.sum,
  }),
  [transactionsActions.expensePostSuccess]: (state, { payload }) => ({
    ...state,
    balance: state.balance - payload.transaction.sum,
  }),
  // [actionDelete.transactionDeleteSuccess]: (state, { payload }) => ({
  //   ...state,
  //   balance: payload.balance,
  //   transactions: state.transactions.filter(item => item._id !== payload.id),
  // }),
  [actionDelete.transactionIncomeDeleteSuccess]: (state, { payload }) => ({
    ...state,
    balance: state.balance - payload.transaction.sum,
  }),
  [actionDelete.transactionExpenceDeleteSuccess]: (state, { payload }) => ({
    ...state,
    balance: state.balance + payload.transaction.sum,
  }),
});

const tokenInitialState = null;
const token = createReducer(tokenInitialState, {
  [authActions.logInSuccess]: (_, { payload }) => payload.token,
  [authActions.logOutSuccess]: () => tokenInitialState,
  [authActions.setGoogleToken]: (_, { payload }) => payload,
});

const isAuthenticated = createReducer(false, {
  [authActions.logInSuccess]: () => true,
  [authActions.logOutSuccess]: () => false,
  [authActions.getCurrentUserSuccess]: () => true,
  [authActions.getCurrentUserError]: () => false,
  [transactionsActions.incomeGetError]: () => false,
  [transactionsActions.incomePostError]: () => false,
  [transactionsActions.expenseGetError]: () => false,
  [transactionsActions.expensePostError]: () => false,
  [actionDelete.transactionDeleteError]: () => false,
  [actionDelete.transactionIncomeDeleteError]: () => false,
  [actionDelete.transactionExpenceDeleteError]: () => false,
  [summaryActions.summaryGetError]: () => false,
});

export default combineReducers({
  user,
  isAuthenticated,
  token,
});
