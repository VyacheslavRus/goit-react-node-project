import api from '../../services/kapusta-api';
import actions from '../actions/periodDataActions';

const getPeriodData = date => async dispatch => {
  dispatch(actions.periodDataGetRequest());
  // console.log('gggggg');

  try {
    const respExp = await api.expenseForPeriodGet(date);
    const respInc = await api.incomeForPeriodGet(date);
    // console.log('respDataExpense', respExp.data);
    console.log('respDataIncome', respInc.data);

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

    // console.log('Объект с суммами категорий', objCat);

    const intialState = {
      incomes: {
        total: Object.values(objCatInc).reduce((acc, el) => acc + el, 0),
        incomesData: respInc.data.reduce((acc, ell) => {
          acc[ell.category] = respInc.data.reduce((acc, elll) => {
            if (ell.category === elll.category) {
              acc[elll.description] = elll.sum;
            }
            return { ...acc, total: objCatInc[ell.category] };
          }, {});
          return acc;
        }, {}),
        // {
        //     'З/П': {
        //       total: 12000,
        //       Аванс: 5000,
        //       Основная: 7000,
        //     },
        // },
      },
      expenses: {
        total: Object.values(objCatExp).reduce((acc, el) => acc + el, 0),

        expensesData: respExp.data.reduce((acc, ell) => {
          acc[ell.category] = respExp.data.reduce((acc, elll) => {
            if (ell.category === elll.category) {
              acc[elll.description] = elll.sum;
            }
            return { ...acc, total: objCatExp[ell.category] };
          }, {});
          return acc;
        }, {}),
      },
    };
    console.log(intialState);

    dispatch(actions.periodDataGetSuccess(intialState));
  } catch (error) {
    dispatch(actions.periodDataGetError());
  }
};

// const getPeriodDataIncome = date => async dispatch => {
//   dispatch(actions.periodDataGetRequest());
//   //   console.log(resp);
//   try {
//     const resp = await api.incomeForPeriodGet(date);
//     console.log(resp.data);
//     dispatch(actions.periodDataIncome(resp.data));
//   } catch (error) {
//     dispatch(actions.periodDataGetError());
//   }
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPeriodData };
