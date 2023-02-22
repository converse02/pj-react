import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const categoryId = useSelector(({ filter }) => filter.filterIndex);
  const sortId = useSelector(({ filter }) => filter.sort);
  const page = useSelector(({ filter }) => filter.pageCount);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPizzas = () => {
    const category = categoryId ? 'category=' + categoryId : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    axios
      .get(
        `https://63eb336efb6b6b7cf7d97abc.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortId}&order=asc${search}`,
      )
      .then((resp) => {
        setPizzas(resp.data);
        setIsLoading(false);
      });
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
    }

    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortId, page, searchValue]);

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
