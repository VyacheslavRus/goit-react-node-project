import React from 'react';
import styles from './Summary.module.scss';

const Summary = ({ summary }) => {
  const currentMonthIndex = new Date().getMonth();
  const summaryEntries = Object.entries(summary).reverse();
  const neededMonths = [...summaryEntries].splice(11 - currentMonthIndex, 6);

  const months = {
    jan: 'январь',
    feb: 'февраль',
    mar: 'март',
    apr: 'апрель',
    may: 'май',
    jun: 'июнь',
    jul: 'июль',
    aug: 'август',
    sep: 'сентябрь',
    oct: 'октябрь',
    nov: 'ноябрь',
    dec: 'декабрь',
  };

  return (
    <table className={styles.table}>
      <tbody>
        <tr key="sum">
          <th className={styles.tableHeader} colSpan="2">
            CВОДКА
          </th>
        </tr>
        {neededMonths.map(item => (
          <tr key={item[0]}>
            <th className={styles.month}>{months[item[0]]}</th>
            <th className={styles.sum}>{item[1]}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Summary;
