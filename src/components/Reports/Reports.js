import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes/routes';
import style from './Reports.module.scss';
import sprite from '../../img/sprite.svg';

const Reports = () => {
  return (
    <div className={style.balanceValue}>
      <NavLink to={routes.stats} className={style.balanceLink}>
        Перейти к отчётам
        <svg className={style.svg} width="24" height="24">
          <use href={sprite + '#icon-bar_chart'}></use>
        </svg>
      </NavLink>
    </div>
  );
};

export default Reports;
