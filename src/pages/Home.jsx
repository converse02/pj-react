import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortId, setSortId] = React.useState('rating');

  const [page, setPage] = React.useState(1);

  const category = categoryId ? 'category=' + categoryId : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63eb336efb6b6b7cf7d97abc.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortId}&order=asc`,
    )
      .then((resp) => resp.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [category, sortId, page]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortId} onClickSort={(type) => setSortId(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination onPageChange={(i) => setPage(i)} />
    </div>
  );
};

export default Home;
