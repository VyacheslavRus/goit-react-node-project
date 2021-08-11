import api from '../../services/kapusta-api';
import actions from '../actions/balanceActions';

export const addBalance = balance => dispatch => {
  dispatch(actions.addBalanceRequest());

  api
    .balancePost(balance)
    .then(({ data }) => {
      console.log('data: ', data);
      dispatch(actions.addBalanceSuccess(data.balance));
      console.log('newBalance: ', data.balance);
    })
    .catch(error => dispatch(actions.addBalanceError(error.message)));
};
