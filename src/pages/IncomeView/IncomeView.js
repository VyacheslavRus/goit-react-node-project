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
import { getCategoryIncome } from '../../redux/selectors/categoriesSelectors';
import operation from '../../redux/selectors/transactionsSelectors';
import { handleDeleteIncome } from '../../redux/operations/transactionsDeleteOperations';
import style from './IncomeView.module.scss';
import summarySelectors from '../../redux/selectors/summarySelectors';
import summaryOperations from '../../redux/operations/summaryOperations';

export default function IncomeView() {
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const costList = useSelector(operation.getIncomeTransaction);
  const category = useSelector(getCategoryIncome);
  const summary = useSelector(summarySelectors.getIncomeSummary);

  // componenentDidMount
  useEffect(() => {
    dispatch(transactionsOperations.handleIncomeGet());
    dispatch(categoriesOperations.handleIncomeCategGet());
    dispatch(summaryOperations.handleSummaryGetIncome(new Date().getFullYear()));
  }, [dispatch]);

  const submitData = data => {
    dispatch(transactionsOperations.handleIncomePost(data));
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
            {width > 767 && <TransactionTable costList={costList} fnRemove={handleDeleteIncome} styleOption={false} />}
            {width > 767 && <Summary summary={summary} />}
          </div>
        </TransactionContainer>
      </Container>
    </main>
  );
}
