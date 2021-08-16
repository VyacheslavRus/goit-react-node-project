import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use-size';
import Container from '../../components/Container';
import TransactionContainer from '../../components/TransactionContainer/TransactionContainer';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import Summary from '../../components/Summary/Summary';
import transactionsOperations from '../../redux/operations/transactionsOperations';
import categoriesOperations from '../../redux/operations/categoriesOperations';
import BalanceForm from '../../components/BalanceForm/BalanceForm';
import Balance from '../../components/Balance/Balance';
import Reports from '../../components/Reports/Reports';
import { getCategoryExpense } from '../../redux/selectors/categoriesSelectors';
import selectors from '../../redux/selectors/transactionsSelectors';
import { handleDeleteExpence } from '../../redux/operations/transactionsDeleteOperations';
import style from './ExpenseView.module.scss';
import summarySelectors from '../../redux/selectors/summarySelectors';
import summaryOperations from '../../redux/operations/summaryOperations';

export default function ExpenseView() {
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const costList = useSelector(selectors.getExpenseTransaction);
  const category = useSelector(getCategoryExpense);
  const summary = useSelector(summarySelectors.getExpenseSummary);

  // componenentDidMount
  useEffect(() => {
    dispatch(transactionsOperations.handleExpenseGet());
    dispatch(categoriesOperations.handleExpenseCategGet());
    dispatch(summaryOperations.handleSummaryGetExpense(new Date().getFullYear()));
  }, [dispatch]);

  const submitData = data => {
    dispatch(transactionsOperations.handleExpensePost(data));
  };

  return (
    <main className={style.main}>
      <Container>
        {width > 767 && (
          <div className={style.balanceWrap}>
            <Balance />
            <Reports />
          </div>
        )}

        <TransactionContainer>
          <BalanceForm category={category} submitData={submitData} />
          <div className={style.wrapper}>
            {width > 767 && <TransactionTable costList={costList} fnRemove={handleDeleteExpence} styleOption={true} />}
            {width > 767 && <Summary summary={summary} />}
          </div>
        </TransactionContainer>
      </Container>
    </main>
  );
}
