import { useSelector } from 'react-redux';
import {
  getExpenseTotal,
  getIncomeTotal,
} from '../../redux/selectors/periodDataSelectors';
import styles from './FinanceTotal.module.scss';

Number.prototype.format = function (n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(
    new RegExp(re, 'g'),
    '$&' + (s || ','),
  );
};

const FinanceTotal = () => {
  const expenseTotal = useSelector(getExpenseTotal);
  const incomeTotal = useSelector(getIncomeTotal);

  const valueIncomeTotal = incomeTotal?.format(2, 3, ' ', '.');

  const valueExpenseTotal = expenseTotal?.format(2, 3, ' ', '.');

  return (
    <div className={styles.wrap}>
      <ul className={styles.financeTotal}>
        <li className={`${styles.financeTotalItem} `}>
          <div className={styles.containerDetails}>
            <h2 className={styles.financeTotalTitle}>Расходы:</h2>
            <div className={styles.expensesAmount}>
              - {valueExpenseTotal} грн.
            </div>
          </div>
        </li>
        <li
          className={`${styles.financeTotalItem} ${styles.financeTotalItemBorder}`}
        >
          <div className={styles.containerDetails}>
            <h2 className={styles.financeTotalTitle}>Доходы:</h2>
            <div className={styles.incomeAmount}>+ {valueIncomeTotal} грн.</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FinanceTotal;
