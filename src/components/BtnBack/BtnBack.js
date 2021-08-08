import { Link } from 'react-router-dom';
import routes from '../../routes/routes';
import { useBreakpoint } from 'react-use-size';
import styles from './BtnBack.module.scss';
import sprite from '../../img/sprite.svg';

const BtnBack = () => {
  return (
    <Link to={routes.home} className={styles.btnBack}>
      <svg width="24" height="24">
        <use href={sprite + '#icon-back-home'}></use>
      </svg>
      {!useBreakpoint(768) && <span>Вернуться на главную</span>}
    </Link>
  );
};

export default BtnBack;
