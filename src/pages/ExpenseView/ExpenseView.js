import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use-size';
import Container from '../../components/Container';
import TransactionContainer from '../../components/TransactionContainer/TransactionContainer';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
// import Summary from '../../components/Summary/Summary';
import transactionsOperations from '../../redux/operations/transactionsOperations';
import categoriesOperations from '../../redux/operations/categoriesOperations';
import BalanceForm from '../../components/BalanceForm/BalanceForm';
// import BalanceCustom from '../../components/BalanceCustom/BalanceCustom';
// import GoToReport from '../../components/GoToReport/GoToReport';
import { getCategoryExpense } from '../../redux/selectors/categoriesSelectors';
import selectors from '../../redux/selectors/transactionsSelectors';
import { handleDeleteExpence } from '../../redux/operations/transactionsDeleteOperations';
import style from './ExpenseView.module.scss';

export default function ExpenseView() {
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const costList = useSelector(selectors.getExpenseTransaction);
  const category = useSelector(getCategoryExpense);

  const getPeriod = () => {
    const today = new Date(Date.now());
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : `${month}`;
    const year = today.getFullYear();
    const period = `${month}.${year}`;
    return period;
  };

  // componenentDidMount
  useEffect(() => {
    dispatch(transactionsOperations.handleExpenseGet(getPeriod()));
    dispatch(categoriesOperations.handleExpenseCategGet());
  }, [dispatch]);

  // componentDidUpdate
  useEffect(() => {
    if (costList) return;

    dispatch(transactionsOperations.handleExpenseGet(getPeriod()));
  }, [dispatch, costList]);

  useEffect(() => {
    if (category) return;

    dispatch(categoriesOperations.handleExpenseCategGet());
  }, [dispatch, category]);

  const submitIncomeData = data => {
    dispatch(transactionsOperations.handleExpensePost(data));
  };

  return (
    <main className={style.main}>
      <Container>
        {width > 767 && (
          <div className={style.balanceWrap}>
            {/* <BalanceCustom /> */}
            {/* <GoToReport /> */}
          </div>
        )}

        <TransactionContainer>
          <BalanceForm
            category={category}
            submitIncomeData={submitIncomeData}
          />
          <div className={style.wrapper}>
            {width > 767 && (
              <TransactionTable
                costList={costList}
                fnRemove={handleDeleteExpence}
                styleOption={true}
              />
            )}
            {/* {width > 767 && <Summary />} */}
          </div>
        </TransactionContainer>
      </Container>
    </main>
  );
}
