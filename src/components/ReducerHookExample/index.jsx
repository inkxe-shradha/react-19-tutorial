import { useReducer } from 'react';

const initialState = 0;

const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

// Optional like API call
const initLazyInitializer = (initialValue) => {
  console.log('This function is called at once during initial render');
  return initialValue + 100;
};
const ReducerHooks = () => {
  const [count, dispatch] = useReducer(
    reducer,
    initialState,
    initLazyInitializer // optional lazy initializer function
  );
  return (
    <div className="margin-top">
      <h3>Reducer Hook Example Component - {count} </h3>
      <div className="flex">
        <button onClick={() => dispatch('increment')}>Increment ➕ </button>
        <button onClick={() => dispatch('decrement')}>Decrement ➖ </button>
        <button onClick={() => dispatch('reset')}>Reset 🔄 </button>
      </div>
    </div>
  );
};

export default ReducerHooks;
