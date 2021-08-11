import React, { Suspense, lazy,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useLocation } from 'react-router-dom';
import { useBreakpoint } from 'react-use-size';
import Header from './components/Header/Header';
import { routes, PublicRoute, PrivateRoute } from './routes';
import * as authSelectors from './redux/selectors/authSelectors';
import authOperations from './redux/operations/authOperations';
import authActions from './redux/actions/authActions';
import api from './services/kapusta-api' 
import { autoInject } from 'async';

const AuthorizationView = lazy(() =>
  import(
    './pages/AuthorizationView' /* webpackChunkName: "AuthorizationView" */
  ),
);
const HomeView = lazy(() =>
  import('./pages/HomeView' /* webpackChunkName: "HomeView" */),
);
const ExpenseView = lazy(() =>
  import('./pages/ExpenseView' /* webpackChunkName: "ExpenseView" */),
);
const IncomeView = lazy(() =>
  import('./pages/IncomeView' /* webpackChunkName: "IncomeView" */),
);
const StatisticsView = lazy(() =>
  import('./pages/StatiscticsView' /* webpackChunkName: "StatisticsView" */),
);

export default function App() {


  const userEmail = useSelector(authSelectors.getUserEmail);
  const token = useSelector(authSelectors.getToken);
  const dispatch = useDispatch();
  const location = useLocation();

  const width = useBreakpoint(768);
   
  
  let x = location.pathname === '/authorization';
  let y = x ? 'main-top-auth' : 'main-top';

  useEffect(()=>{
    console.log(token);
    if(token){
      
    api.token.set(token)  
    }
  },[token])


  return (
    <>
    <Header/>
      <div className="main-bg-auth">
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <PublicRoute path={routes.auth} restricted redirectTo={routes.home}>
              <AuthorizationView />
            </PublicRoute>

            <PrivateRoute exact path={routes.home} redirectTo={routes.auth}>
              <HomeView />
            </PrivateRoute>

            <PrivateRoute path={routes.expense} redirectTo={routes.auth}>
              <ExpenseView />
            </PrivateRoute>

            <PrivateRoute path={routes.income} redirectTo={routes.auth}>
              <IncomeView />
            </PrivateRoute>

            <PrivateRoute path={routes.stats} redirectTo={routes.auth}>
              <StatisticsView />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}
