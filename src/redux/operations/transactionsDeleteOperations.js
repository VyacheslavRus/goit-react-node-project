import api from '../../services/kapusta-api';
import actions from '../actions/transactionDeleteActions';

const handleDelete = id => dispatch => {
  dispatch(actions.transactionDeleteRequest());

  api
    .transactionDelete(id)
    .then(({ data }) => dispatch(actions.transactionDeleteSuccess(data)))
    .catch(error => dispatch(actions.transactionDeleteError(error.message)));
};

const handleDeleteIncome = id => dispatch => {
  dispatch(actions.transactionIncomeDeleteRequest());

  api
    .transactionDelete(id)
    .then(({ data }) => dispatch(actions.transactionIncomeDeleteSuccess(data)))
    .catch(error =>
      dispatch(actions.transactionIncomeDeleteError(error.message)),
    );
};

const handleDeleteExpence = id => dispatch => {
  dispatch(actions.transactionExpenceDeleteRequest());

  api
    .transactionDelete(id)
    .then(({ data }) => dispatch(actions.transactionExpenceDeleteSuccess(data)))
    .catch(error =>
      dispatch(actions.transactionExpenceDeleteError(error.message)),
    );
};

// eslint-disable-next-line import/no-anonymous-default-export
export { handleDelete, handleDeleteIncome, handleDeleteExpence };
