import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector } from 'react-redux';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const categoryId = useSelector(({ filter }) => filter.filterIndex);
  const sortId = useSelector(({ filter }) => filter.sort);
  const page = useSelector(({ filter }) => filter.pageCount);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [page, setPage] = React.useState(1);

  const category = categoryId ? 'category=' + categoryId : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://63eb336efb6b6b7cf7d97abc.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortId}&order=asc${search}`,
      )
      .then((resp) => {
        setPizzas(resp.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortId, page, search]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
