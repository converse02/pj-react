import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector(({ filter }) => filter.filterIndex);
  const sortId = useSelector(({ filter }) => filter.sort);
  const page = useSelector(({ filter }) => filter.pageCount);
  const searchValue = useSelector(({ filter }) => filter.searchValue);

  const pizzas = useSelector(({ pizza }) => pizza.items);
  const status = useSelector(({ pizza }) => pizza.status);

  const getPizzas = async () => {
    const category = categoryId ? 'category=' + categoryId : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        page,
        category,
        sortId,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortId,
        page,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortId, page]);

  React.useEffect(() => {
    const searchString = window.location.search;
    if (searchString) {
      const params = qs.parse(searchString.substring(1));
      dispatch(setFilters(params));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortId, page, searchValue]);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const pizzaItems = pizzas.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожелению, не удалось получить пиццы. Попробуйте повторить позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzaItems}</div>
      )}

      <Pagination />
    </div>
  );
};

export default Home;
