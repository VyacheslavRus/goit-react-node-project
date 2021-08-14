import React, { useState } from 'react';
import { withSize } from 'react-sizeme';
import style from './BalanceForm.module.scss';
import PropTypes from 'prop-types';
import sprite from '../../img/sprite.svg';
import customStyles from './ReactSelectStyles';
import CustomCalendar from '../CustomCalendar/CustomCalendar';
import BackHomeButton from '../BackHomeButton/BackHomeButton';
import Select from './Select/Select';
import variables from './variables';
import 'react-calendar/dist/Calendar.css';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserBalance } from '../../redux/selectors/authSelectors';

const BalanceForm = ({ category, submitData, size, match }) => {
  const [date, setDate] = useState('');
  const [value, setValue] = useState(null);
  const [error, setError] = useState('');

  const balance = useSelector(getUserBalance);
  const type = match.path.slice(1);

  const options = category.map(el => ({
    value: el,
    label: `${el[0].toUpperCase() + el.slice(1)}`,
  }));

  const initialForm = {
    type,
    description: '',
    sum: '',
    date: date,
    category: '',
  };

  const [form, setForm] = useState({
    ...initialForm,
  });

  const handleFormValue = ({ target }) => {
    const { name } = target;
    const value = target.value
      .split()
      .filter(el => el !== '+' && el !== '-' && el !== '=' && el !== ' ');
    const filterValue = value.join();
    setForm({ ...form, [name]: filterValue });
  };

  const handleNumberValue = ({ target }) => {
    const regexp = /^[0-9\b]+$/;
    const { name, value } = target;

    if (value === '' || regexp.test(value)) {
      setForm({ ...form, [name]: value });
    }
  };

  const getDate = date => {
    setDate(date);
    setForm({ ...form, [variables.date]: date });
  };

  const handleCategory = value => {
    setForm({ ...form, [variables.category]: value.value });
    setValue(value);
  };

  const clearForm = () => {
    setForm({ ...initialForm });
    setValue(null);
    setError('');
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    setError('');

    const correctForm = {
      ...form,
      sum: parseFloat(form.sum),
      date: form.date.split('-').reverse().join('.'),
      category: form.category.toLowerCase(),
    };

    if (type === 'expense' && correctForm.sum > balance) {
      setError('Сумма расхода превышает текущий баланс');
      return;
    }

    submitData(correctForm);
    clearForm();
  };

  return (
    <>
      <form onSubmit={handleSubmitForm} className={style.form}>
        <div className={style.calendarContainer}>
          {size.width < 605 && (
            <div className={style.headContainer}>
              <BackHomeButton />
            </div>
          )}
          <CustomCalendar getDate={getDate} />

          <div className={style.labelsContainer}>
            <label className={style.label}>
              <input
                className={style.input}
                type="text"
                placeholder="Описание товара"
                value={form.description}
                maxLength="20"
                name={variables.description}
                onChange={handleFormValue}
                required
              />
            </label>
            <label className={style.labelSelect}>
              <Select
                required
                options={options}
                styles={customStyles}
                placeholder={'Категория товара'}
                value={value}
                components={{
                  IndicatorSeparator: () => null,
                }}
                isSearchable={false}
                onChange={handleCategory}
              />
            </label>
            {size.width > 604 && (
              <div className={style.inputNumberContainerTD}>
                <label className={style.labelNumberTD}>
                  <input
                    className={style.inputNumberTD}
                    type="text"
                    placeholder="00,00"
                    value={form.sum}
                    name={variables.sum}
                    onChange={handleNumberValue}
                    maxLength="6"
                    required
                  />
                </label>
                <div className={style.svgContainerTD}>
                  <svg width="20" height="20" className={style.svg}>
                    <use href={sprite + '#icon-calculator'}></use>
                  </svg>
                </div>
              </div>
            )}
          </div>
          {size.width < 605 && (
            <div className={style.inputNumberContainer}>
              <label className={style.labelNumber}>
                <input
                  className={style.inputNumber}
                  type="text"
                  placeholder="00.00 UAH"
                  name={variables.sum}
                  value={form.sum}
                  maxLength="6"
                  onChange={handleNumberValue}
                  required
                />
              </label>
              <div className={style.svgContainer}>
                <svg width="20" height="20" className={style.svg}>
                  <use href={sprite + '#icon-calculator'}></use>
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className={style.buttonContainer}>
          <button type="submit" className={style.buttonSubmit}>
            Ввод
          </button>
          <button onClick={clearForm} type="button" className={style.buttonClear}>
            Очистить
          </button>
        </div>
      </form>
      <div className={style.error}>{error ? error : null}</div>
    </>
  );
};

BalanceForm.propTypes = {
  category: PropTypes.array.isRequired,
  submitData: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
};

export default withRouter(withSize({ monitorWidth: true })(BalanceForm));
