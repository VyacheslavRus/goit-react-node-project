import React from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'react-use-size';
import { Redirect } from 'react-router-dom';

import Container from '../../components/Container';
import TransactionContainer from '../../components/TransactionContainer/TransactionContainer';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import operation from '../../redux/selectors/transactionsSelectors';
import { handleDelete } from '../../redux/operations/transactionsDeleteOperations';
import style from './HomeView.module.scss';
import routes from '../../routes/routes';
import Balance from '../../components/Balance/Balance';
import Reports from '../../components/Reports/Reports'

const HomeView = () => {
  const costList = useSelector(operation.getAllransactions);
  const { width } = useWindowSize();
  return (
    <>
      {width > 767 && <Redirect to={routes.expense} />}
      <main className={style.main}>
        <Container>
          <div className={style.balanceWrap}>
            <Balance />
            <Reports />
          </div>
          <TransactionContainer>
            <TransactionTable costList={costList} fnRemove={handleDelete} />
          </TransactionContainer>
        </Container>
      </main>
    </>
  );
};

export default HomeView;
