import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import style from './Balance.module.scss';
import BalanceModal from '../BalanceModal/BalanceModal';
import { getUserBalance } from '../../redux/selectors/authSelectors';
import { addBalance } from '../../redux/operations/balanceOperations';

const Balance = () => {
  const newBalance = useSelector(state => getUserBalance(state));
  const [currentBalance, setCurrentBalance] = useState(newBalance);
  const [read, setRead] = useState(false);
  const [inputValue, setValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    newBalance > 0 ? setRead(true) : setRead(false);
    return newBalance !== undefined ? setCurrentBalance(newBalance) : null;
  }, [newBalance]);

  const dispatch = useDispatch();
  const balanceHandler = ({ target }) => {
    const { value } = target;
    setValue(value);
  };
  const balanceSubmit = e => {
    e.preventDefault();
    dispatch(addBalance({ balance: inputValue }));
    setRead(true);
  };
  return (
    <div className={style.container}>
      <form className={style.balanceForm} onSubmit={balanceSubmit}>
        <label htmlFor="balance" className={style.balanceLabel}>
          Баланс:
        </label>
        <input
          readOnly={currentBalance ? read : false}
          maxLength="6"
          id="balance"
          onChange={balanceHandler}
          className={
            location.pathname === '/statistics'
              ? style.input
              : style.balanceInput
          }
          type="text"
          name="newBalance"
          placeholder={currentBalance > 0 ? currentBalance : '00.00 UAH'}
          value={currentBalance > 0 ? currentBalance : inputValue}
        />
        {currentBalance === 0 && location.pathname !== '/statistics' ? (
          <button type="submit" className={style.balanceButton}>
            ПОДТВЕРДИТЬ
          </button>
        ) : null}
        {currentBalance === 0 && location.pathname !== '/statistics' ? (
          <BalanceModal />
        ) : null}
      </form>
    </div>
  );
};

export default Balance;
