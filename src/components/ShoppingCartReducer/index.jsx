import React, { useReducer } from 'react';

const initialState = {
  items: [], // {id, name, price, quantity}
  totalAmount: 0,
  totalItems: 0,
};

const reducer = (state, action) => {
  // return new state
  switch (action.type) {
    case 'ADD_ITEM': {
      const exitingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      let updatedItems;
      if (exitingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[exitingItemIndex] = {
          ...updatedItems[exitingItemIndex],
          quantity: updatedItems[exitingItemIndex].quantity + 1,
        };
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    }
    case 'REMOVE_ITEM': {
      const exitingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (exitingItemIndex < 0) return state; // Item not found
      const updatedItems = [...state.items];
      if (updatedItems[exitingItemIndex].quantity > 1) {
        updatedItems[exitingItemIndex] = {
          ...updatedItems[exitingItemIndex],
          quantity: updatedItems[exitingItemIndex].quantity - 1,
        };
      } else {
        updatedItems.splice(exitingItemIndex, 1);
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        totalItems: updatedItems.reduce((acc, item) => acc + item.quantity, 0),
      };
    }
    default:
      return state;
  }
};

const ShoppingCartReducers = () => {
  const productList = [
    {
      id: 1,
      name: 'JavaScript',
      price: 59.99,
    },
    {
      id: 2,
      name: 'HTML',
      price: 59.99,
    },
    {
      id: 3,
      name: 'CSS',
      price: 59.99,
    },
  ];
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h2>Product List</h2>
      {productList.map((product) => (
        <div key={product?.id} className="flex">
          <h3>
            {product.name} - {product.price}
          </h3>
          <button
            className="margin-top"
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
          >
            {' '}
            Add to Cart 🛒{' '}
          </button>
        </div>
      ))}

      <div>
        <h2> Shopping Cart </h2>
        {state.items.length === 0 ? (
          <p>You Shopping Cart Item is Empty</p>
        ) : (
          <div>
            {state.items?.map((item) => (
              <div key={item.id} className="flex">
                <h3>
                  {item.name} - {item.price} x {item.quantity}{' '}
                </h3>
                <button className="margin-top">Remove One Quantity</button>
              </div>
            ))}
            <h3>Total Items: {state.totalItems} </h3>
            <h3>Total Amount: {state.totalAmount.toFixed(2)} </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartReducers;
