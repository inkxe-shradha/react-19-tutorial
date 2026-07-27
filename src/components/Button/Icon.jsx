import React from 'react';
import UserContext from '../../context/UserContext';

const Icon = ({ count }) => {
  const userData = React.useContext(UserContext);
  return (
    <div>
      {' '}
      {userData.user.name}: {count}
    </div>
  );
};

export default Icon;
