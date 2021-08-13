import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './MonthCalendar.module.scss';
import sprite from '../../img/sprite.svg';
import dataPeriodActions from '../../redux/actions/periodDataActions';
import getPeriodDataOperation from '../../redux/operations/periodDataOperations';


const MonthCalendar = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPeriodDataOperation(formatDate(date)));
    return () => dispatch(dataPeriodActions.periodDataClear());
  }, [dispatch, date]);

  const referenceDate = date;

  const options = { month: 'long' };
  const month = new Intl.DateTimeFormat('rus', options).format(date);
  const year = date.getFullYear();

  const setNextMonth = () => {
    referenceDate.setMonth(referenceDate.getMonth() + 1);
    setDate(new Date(referenceDate));
    dispatch(getPeriodDataOperation(formatDate(date)));
  };

  const setPrevMonth = () => {
    referenceDate.setMonth(referenceDate.getMonth() - 1);
    setDate(new Date(referenceDate));
    dispatch(getPeriodDataOperation(formatDate(date)));
  };

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    let result = [month, year].join('.');
    return result;
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.currentPeriod}>Текущий период:</p>
      <div className={styles.calendarNav}>
        <button
          onClick={setPrevMonth}
          className={`${styles.button}  ${styles.buttonPrev}`}
          type="button"
        >
          <svg width="6" height="15">
            <use href={sprite + '#icon-arrow-left'}></use>
          </svg>
        </button>
        <span className={styles.date}>{`${month} ${year}`}</span>

        <button
          disabled={date.getMonth() === new Date().getMonth()}
          onClick={setNextMonth}
          className={`${styles.button}  ${styles.buttonNext}`}
          type="button"
        >
          <svg width="6" height="15">
            <use href={sprite + '#icon-arrow-right'}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MonthCalendar;
