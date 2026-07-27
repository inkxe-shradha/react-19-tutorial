import { useReducer } from 'react';

const init = (initialValue) => {
  if (typeof initialValue === 'function') {
    return initialValue();
  }
  return initialValue;
};

const useStateCustom = (initialValue) => {
  let _val = initialValue; // hold our state in closure
  const reducer = (state, action) => {
    if (typeof action == 'function') {
      return action(state);
    }
    return action;
  };
  const [state, dispatch] = useReducer(reducer, _val, init);
  const setState = (newVal) => {
    dispatch(newVal);
  };

  return [state, setState];
};

export default useStateCustom;
