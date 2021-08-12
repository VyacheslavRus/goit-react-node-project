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
// const refreshToken = sid => axios.post('/auth/refresh', sid);
// const googleAuth = () => axios.get('/auth/google');

/* TRANSACTIONS */
const transactionPost = credentials => axios.post('/transactions', credentials);
// const incomePost = data => axios.post('/transaction/income', data);
// const expensePost = data => axios.post('/transaction/expense', data);

const incomeGet = () => axios.get(`/transactions/income`);
const expenseGet = () => axios.get(`/transactions/expense`);
const incomeForPeriodGet = period =>
  axios.get(`/transactions/income/${period}`);
const expenseForPeriodGet = period =>
  axios.get(`/transactions/expense/${period}`);

const transactionDelete = transactionId =>
  axios.delete(`/transactions/${transactionId}`);

const incomeCategoriesGet = () => axios.get('/categories/income');
const expenseCategoriesGet = () => axios.get('/categories/expense');

const periodDataGet = date =>
  axios.get(`/transaction/period-data?date=${date}`);

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
  periodDataGet,
  balancePost,
  userDataGet,
};
