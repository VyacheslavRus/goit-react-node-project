// import { createSelector } from 'reselect';

export const getUserEmail = state => state.auth.user.email;
export const getIsAuthenticated = state => state.auth.isAuthenticated;
export const getToken = state => state.auth.user.token;
export const getUserBalance = state => state.auth.user.balance;
