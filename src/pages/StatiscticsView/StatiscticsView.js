import React from 'react';
import { useSelector } from 'react-redux';
import Balance from '../../components/Balance/Balance';
import BtnBack from '../../components/BtnBack/BtnBack';
import Container from '../../components/Container';
import FinanceTotal from '../../components/FinanceTotal/FinanceTotal';
import MonthCalendar from '../../components/MonthCalendar/MonthCalendar';
import ReportsBalance from '../../components/ReportsBalance.js/ReportsBalance';
import ReportsExInSwitch from '../../components/ReportsExInSwitch/ReportsExInSwitch';
import style from './StatiscticsView.module.scss';

const StatisticsView = () => {
  const periodData = useSelector(state => state.periodData);

  return (
    <main className={style.main}>
      <Container>
        <div className={style.barWrapper}>
          <BtnBack />
          <div className={style.balanceWrap}>
            <Balance />
            <MonthCalendar />
          </div>
        </div>

        <div className={style.wrapper}>
          <FinanceTotal />
        </div>

        <div className={style.wrapper}>
          {periodData.expenses && <ReportsExInSwitch />}
        </div>
      </Container>
    </main>
  );
};

export default StatisticsView;
