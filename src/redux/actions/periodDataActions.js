import { createAction } from '@reduxjs/toolkit';

const periodDataGetRequest = createAction('transactions/periodDataGetRequest');
const periodDataGetSuccess = createAction('transactions/periodDataGetSuccess');
const periodDataGetError = createAction('transactions/periodDataGetError');
const periodDataClear = createAction('periodData/ getClear');
const periodDataExpense = createAction('periodData/periodDataExpence');
const periodDataIncome = createAction('periodData/periodDataIncome');

// eslint-disable-next-line
export default {
  periodDataGetRequest,
  periodDataGetSuccess,
  periodDataGetError,
  periodDataClear,
  periodDataExpense,
  periodDataIncome,
};
