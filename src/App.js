import React, { useEffect } from 'react';
import './scss/app.scss';

import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  useEffect(() => {
    fetch('https://63eb336efb6b6b7cf7d97abc.mockapi.io/items')
      .then((resp) => resp.json())
      .then((data) => setPizzas(data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas && pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
