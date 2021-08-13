import api from '../../services/kapusta-api';
import actions from '../actions/periodDataActions';

const getPeriodDataOperation = date => async dispatch => {
  dispatch(actions.periodDataGetRequest());

  try {
    const respExp = await api.expenseForPeriodGet(date);
    const respInc = await api.incomeForPeriodGet(date);

    const objCatExp = {};

    respExp.data.forEach(trans => {
      if (!objCatExp[trans.category]) {
        objCatExp[trans.category] = 0;
      }
    });

    respExp.data?.forEach(element => {
      objCatExp[element.category] += element.sum;
    });

    const objCatInc = {};

    respInc.data.forEach(trans => {
      if (!objCatInc[trans.category]) {
        objCatInc[trans.category] = 0;
      }
    });

    respInc.data.forEach(element => {
      objCatInc[element.category] += element.sum;
    });

    const intialState = {
      incomes: {
        total: Object.values(objCatInc).reduce((acc, el) => acc + el, 0),
        incomesData: respInc.data.reduce((acc, ell) => {
          acc[ell.category] = respInc.data.reduce((acc, elll) => {
            if (ell.category === elll.category) {
              acc[elll.description] = elll.sum;
            }
            return { total: objCatInc[ell.category], ...acc };
          }, {});
          return acc;
        }, {}),
      },
      expenses: {
        total: Object.values(objCatExp).reduce((acc, el) => acc + el, 0),

        expensesData: respExp.data.reduce((acc, ell) => {
          acc[ell.category] = respExp.data.reduce((acc, elll) => {
            if (ell.category === elll.category) {
              acc[elll.description] = elll.sum;
            }
            return { total: objCatExp[ell.category], ...acc };
          }, {});
          return acc;
        }, {}),
      },
    };

    dispatch(actions.periodDataGetSuccess(intialState));
  } catch (error) {
    dispatch(actions.periodDataGetError());
  }
};


export default getPeriodDataOperation;