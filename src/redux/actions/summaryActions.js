import { createAction } from '@reduxjs/toolkit';

const summaryGetIncomeRequest = createAction('summary/GetIncomeRequest');
const summaryGetIncomeSuccess = createAction('summary/GetIncomeSuccess');
const summaryGetIncomeError = createAction('summary/GetIncomeError');

const summaryGetExpenseRequest = createAction('summary/GetExpenseRequest');
const summaryGetExpenseSuccess = createAction('summary/GetExpenseSuccess');
const summaryGetExpenseError = createAction('summary/GetExpenseError');

// eslint-disable-next-line
export default {
  summaryGetIncomeRequest,
  summaryGetIncomeSuccess,
  summaryGetIncomeError,
  summaryGetExpenseRequest,
  summaryGetExpenseSuccess,
  summaryGetExpenseError,
};
