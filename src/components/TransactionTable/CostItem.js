import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowSize } from 'react-use-size';
import PropTypes from 'prop-types';
import sprite from '../../img/sprite.svg';
import style from './TransactionTable.module.scss';

function CostItem({ desc, amount, date, category, id, fnRemove, styleOption }) {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [status, setStatus] = useState(true); //переключатель анимаации при удалении

  const fnDeleteItem = id => {
    dispatch(fnRemove(id));
    setStatus(false);
  };

  return (
    <div className={status ? style.table__body : style.table__body_delete}>
      <ul className={style.table__box}>
        <li className={style.table__text}>{date}</li>
        <li className={style.table__text}>{desc}</li>
        <li
          className={style.table__text}
        >{`${category[0].toUpperCase()}${category.slice(1)}`}</li>
        <li className={style.table__text}>
          {/* -----------------------Desctop-Tablet------------------------------- */}
          {styleOption && width > 767 && (
            <div className={style.item__minus}>- {amount} грн.</div>
          )}
          {!styleOption && width > 767 && (
            <div className={style.item__plus}>+ {amount} грн.</div>
          )}
          {/* ------------------------------Mobile------------------------------- */}
          {styleOption && width <= 767 && (
            <div className={style.item__minus}>- {amount} грн.</div>
          )}
          {!styleOption && width <= 767 && (
            <div className={style.item__plus}>+ {amount} грн.</div>
          )}
        </li>
      </ul>
      <span className={style.item__remove} onClick={() => fnDeleteItem(id)}>
        <svg width="16" height="16">
          <use href={sprite + '#icon-delete'}></use>
        </svg>
      </span>
    </div>
  );
}

CostItem.propTypes = {
  desc: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
};

export default CostItem;
