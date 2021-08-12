import api from '../../services/kapusta-api';
import actions from '../actions/periodDataActions';

const getPeriodDataExpense = date => async dispatch => {
  dispatch(actions.periodDataGetRequest());
  console.log('gggggg');

  try {
    const resp = await api.expenseForPeriodGet(date);
    console.log('ggg', resp.data);

    const obj = {};

    resp.data.forEach(trans => {
      if (!obj[trans.category]) {
        obj[trans.category] = 0;
      }
    });

    if (resp.data) {
      resp.data?.forEach(element => {
        obj[element.category] += element.sum;
      });
    }
    console.log(obj);

    dispatch(actions.periodDataExpense(obj));
  } catch (error) {
    dispatch(actions.periodDataGetError());
  }
};

const getPeriodDataIncome = date => async dispatch => {
  dispatch(actions.periodDataGetRequest());
  //   console.log(resp);
  try {
    const resp = await api.incomeForPeriodGet(date);
    console.log(resp.data);
    dispatch(actions.periodDataIncome(resp.data));
  } catch (error) {
    dispatch(actions.periodDataGetError());
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPeriodDataExpense, getPeriodDataIncome };
