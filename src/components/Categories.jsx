import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={'category_' + index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => setActiveIndex(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
