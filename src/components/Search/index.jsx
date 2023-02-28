import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
  const [value, setValue] = React.useState('');

  const dispatch = useDispatch();

  const inputEl = React.useRef(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputEl.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => dispatch(setSearchValue(str), 250)),
    [],
  );

  const onChangeInput = (e) => {
    const str = e.target.value;
    setValue(str);
    updateSearchValue(str);
  };

  return (
    <div className={styles.root}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.7089 25.9452C20.9145 25.9452 25.9452 20.9145 25.9452 14.7089C25.9452 8.5033 20.9145 3.47266 14.7089 3.47266C8.5033 3.47266 3.47266 8.5033 3.47266 14.7089C3.47266 20.9145 8.5033 25.9452 14.7089 25.9452Z"
          stroke="#7b7b7b"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5225 23.1064L26.9275 27.5002"
          stroke="#7b7b7b"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        ref={inputEl}
        value={value}
        onChange={onChangeInput}
        placeholder="Введите название пиццы"
      />
      <svg
        className={styles.close}
        onClick={onClickClear}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="30px"
        height="30px">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
      </svg>
    </div>
  );
}

export default Search;
