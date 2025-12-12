import React, { useEffect, useState } from 'react';
import './css/App.css';

function App() {
  const [listData, setListData] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      <h2>List count: {listData.length}</h2>
      {listData.map((item, index) => (
        <div key={index} className="item">
          Item {item}
        </div>
      ))}
    </>
  );
}

export default App;
