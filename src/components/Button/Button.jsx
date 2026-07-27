import React from 'react';
import Icon from './Icon';
import { AppContext } from '../../context/AppContext';

const Button = () => {
  const [count, setCount] = React.useState(0);
  const [decrementCount, setDecrementCount] = React.useState(0);
  const [data, setData] = React.useState(null);
  const appContext = React.useContext(AppContext);
  const buttonRef = React.useRef(null);

  // React 19

  // React 18 Important: Use useEffect to fetch data when count or decrementCount changes
  React.useEffect(() => {
    console.log('Button component mounted');
    const postId = count + decrementCount; // Use the current count value for the fetch request
    fetch('https://jsonplaceholder.typicode.com/todos/' + postId)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [count, decrementCount]); // Add count, decrementCount, arrayMethod, and objectMethod as dependencies

  React.useEffect(() => {
    const button = buttonRef.current;
    console.log('Button component mounted', button);
  }, []);

  const handelButtonDecrementClick = () => {
    setDecrementCount(decrementCount + 1);
  };

  React.useEffect(() => {
    console.log('Button status');
  });

  return (
    <div>
      <div>Button</div>y
      <button onClick={() => setCount(count + 1)}>
        Increment : <Icon count={count} />
      </button>
      <button ref={buttonRef} onClick={() => handelButtonDecrementClick()}>
        Decrement : <Icon count={decrementCount} />
      </button>
      <br />
      {data && <div>Data fetched: {JSON.stringify(appContext)}</div>}
    </div>
  );
};

export default Button;
