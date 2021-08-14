const getExpenseSummary = state => state.summary.expense;
const getIncomeSummary = state => state.summary.income;
const getSummary = state => state.summary;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getExpenseSummary,
  getIncomeSummary,
  getSummary,
};
