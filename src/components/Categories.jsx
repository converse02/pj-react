import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFilterIndex } from '../redux/slices/filterSlice';

function Categories() {
  const filter = useSelector(({ filter }) => filter.filterIndex);
  const dispatch = useDispatch();

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={'category_' + index}
            className={filter === index ? 'active' : ''}
            onClick={() => dispatch(setFilterIndex(index))}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
