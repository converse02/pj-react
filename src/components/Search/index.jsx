import React from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

function Search() {
  // const [searchValue, setSearchValue] = React.useState('');

  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  return (
    <div className={styles.root}>
      <input
        className=""
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Введите название пиццы"
      />
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
    </div>
  );
}

export default Search;
