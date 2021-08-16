import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authReducers';
import transactionsReducer from './reducers/transactionsReducer';
import categoriesReducer from './reducers/categoriesReducers';
import periodDataReducer from './reducers/periodDataReducers';
import errorReducer from './error';
import loadingReducer from './isLoading';
import activeCategoryReducer from './reducers/activeCategoryReducer';
import summaryReducers from './reducers/summaryReducers';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isAuthenticated', 'user'],
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  transactions: transactionsReducer,
  summary: summaryReducers,
  categories: categoriesReducer,
  periodData: periodDataReducer,
  error: errorReducer,
  isLoading: loadingReducer,
  activeCategory: activeCategoryReducer,
});
