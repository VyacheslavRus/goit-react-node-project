import api from '../../services/kapusta-api';
import summaryActions from '../actions/summaryActions';

const handleSummaryGetIncome = year => dispatch => {
  dispatch(summaryActions.summaryGetIncomeRequest());

  api
    .summaryGetIncome(year)
    .then(({ data }) => dispatch(summaryActions.summaryGetIncomeSuccess(data)))
    .catch(error => dispatch(summaryActions.summaryGetIncomeError(error.message)));
};

const handleSummaryGetExpense = year => dispatch => {
  dispatch(summaryActions.summaryGetExpenseRequest());

  api
    .summaryGetExpense(year)
    .then(({ data }) => dispatch(summaryActions.summaryGetExpenseSuccess(data)))
    .catch(error => dispatch(summaryActions.summaryGetExpenseError(error.message)));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { handleSummaryGetIncome, handleSummaryGetExpense };
