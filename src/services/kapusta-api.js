import axios from 'axios';

/* DEFAULTS SETTINGS */
axios.defaults.baseURL = 'https://fierce-falls-92546.herokuapp.com/api/v1/';

/* SET && UNSET TOKEN */
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

/* AUTHORIZATION */
const signUp = credentials => axios.post('/auth/signup', credentials);
const logIn = credentials => axios.post('/auth/signin', credentials);
const logOut = () => axios.post('/auth/signout');

/* TRANSACTIONS */
const transactionPost = credentials => axios.post('/transactions', credentials);

const incomeGet = () => axios.get(`/transactions/income`);
const expenseGet = () => axios.get(`/transactions/expense`);

const expenseForPeriodGet = period => axios.get(`/transactions/expense/${period}`);

const incomeForPeriodGet = period => axios.get(`/transactions/income/${period}`);

const transactionDelete = transactionId => axios.delete(`/transactions/${transactionId}`);

const incomeCategoriesGet = () => axios.get('/categories/income');
const expenseCategoriesGet = () => axios.get('/categories/expense');

const summaryGetExpense = year => axios.get(`/transactions/summary/expense/${year}`);
const summaryGetIncome = year => axios.get(`/transactions/summary/income/${year}`);

/* USER */
const balancePost = balance => axios.post('/user/balance', balance);
const userDataGet = () => axios.get('/user');
// eslint-disable-next-line
export default {
  token,
  signUp,
  logIn,
  logOut,
  transactionPost,
  // refreshToken,
  // googleAuth,
  // incomePost,
  incomeGet,
  // expensePost,
  expenseGet,
  incomeForPeriodGet,
  expenseForPeriodGet,
  transactionDelete,
  incomeCategoriesGet,
  expenseCategoriesGet,
  // periodDataGet,
  summaryGetExpense,
  summaryGetIncome,
  balancePost,
  userDataGet,
};
