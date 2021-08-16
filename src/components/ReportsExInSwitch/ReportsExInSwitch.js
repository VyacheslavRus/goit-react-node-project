import React, { useState } from 'react';
import sprite from '../../img/sprite.svg';
import ReportExpense from './ReportExpense/ReportExpense';
import ReportIncome from './ReportIncome/ReportIncome';
import styles from './ReportsExInSwitch.module.scss';

const section = {
  EXPENSE: 'expense',
  INCOME: 'income',
};

const ReportsExInSwitch = () => {
  const [currentSection, setCurrentSection] = useState(section.INCOME);

  return (
    <div className={styles.Panel}>
      <div className={styles.TogglerWrapper}>
        <button
          type="button"
          className={styles.TogglerButton}
          onClick={() => setCurrentSection(section.INCOME)}
        >
          <svg className={styles.ArrowIcon} name="arrowLeft">
            <use href={sprite + '#icon-arrow-left'}></use>
          </svg>
        </button>

        <p className={styles.TogglerText}>
          {section.EXPENSE === currentSection ? 'Доходы' : 'Расходы'}
        </p>

        <button
          type="button"
          className={styles.TogglerButton}
          onClick={() => setCurrentSection(section.EXPENSE)}
        >
          <svg className={styles.ArrowIcon} name="arrowRight">
            <use href={sprite + '#icon-arrow-right'}></use>
          </svg>
        </button>
      </div>
      {section.EXPENSE === currentSection && <ReportIncome />}
      {section.INCOME === currentSection && <ReportExpense />}
    </div>
  );
};

export default ReportsExInSwitch;
