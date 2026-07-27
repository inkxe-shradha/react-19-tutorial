import React, { useCallback, useState } from 'react';
import './css/App.css';
import ReducerHooks from './components/ReducerHookExample';
import ShoppingCartReducers from './components/ShoppingCartReducer';
import useStateCustom from './hooks/customUseState';
import { AppContext } from './context/AppContext';
import Button from './components/Button/Button';
import UserContext from './context/UserContext';
import MemoComponent from './components/Section/MemoComponent';
const products = [
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
];

function App() {
  const [listData, setListData] = useStateCustom([1, 2, 3, 4, 5]);
  const [prodductArry, setProductArray] = useState(products);
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
    email: 'jhonedoe@gmail.com',
  });
  const toggelProduct = () => {
    setProductArray((prevProducts) => {
      if (prevProducts.length === products.length) {
        return prevProducts.filter((product) => product.id !== 2);
      } else {
        return products;
      }
    });
  };

  const handelDeleteProductById = useCallback(
    (id) => {
      return () => {
        setProductArray((prevProducts) =>
          prevProducts.filter((product) => product.id !== id),
        );
      };
    },
    [setProductArray],
  );
  return (
    <AppContext value={{ listData, setListData }}>
      <UserContext value={{ user, setUser }}>
        <Button />
        <button onClick={toggelProduct}>Change Product Filter Status</button>
        <button onClick={() => handelDeleteProductById(2)}>
          {' '}
          Delete Product
        </button>
        <MemoComponent products={prodductArry} filterText="Product" />
      </UserContext>
      {/* <h2>List count: {listData.length}</h2>
      {listData.map((item, index) => (
        <div key={index} className="item">
          Item {item}
        </div>
      ))} */}
      {/* <ReducerHooks /> */}
      {/* <ShoppingCartReducers /> */}
    </AppContext>
  );
}

export default App;
