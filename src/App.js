import './scss/app.scss';

import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const pizzas = [
    { id: 0, name: 'Meksican', price: 319 },
    { id: 1, name: 'Purrina', price: 599 },
    { id: 2, name: 'Solami', price: 299 },
    { id: 3, name: 'Italiano', price: 449 },
  ];

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
            {pizzas &&
              pizzas.map((item) => <PizzaBlock key={item.id + '' + item.name} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
