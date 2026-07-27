import React from 'react';

const MemoComponent = ({ products, filterText }) => {
  const filterProduct = React.useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [products, filterText]);

  return (
    <ul>
      {filterProduct.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default MemoComponent;
