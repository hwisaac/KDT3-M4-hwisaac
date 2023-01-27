import React from 'react';
import ListProduct from './ListProduct';
import ImgProduct from './ImgProduct';

const Product = ({ data, grid }) => {
  return grid === 'list' ? (
    <ListProduct
      key={data.id}
      id={data.id}
      img={data.thumbnail}
      title={data.title}
      price={data.price}
      description={data.description}
      soldOut={data.isSoldOut}
      grid={grid}
    />
  ) : (
    <ImgProduct
      key={data.id}
      id={data.id}
      title={data.title}
      img={data.thumbnail}
      price={data.price}
      description={data.description}
      soldOut={data.isSoldOut}
      grid={grid}
    />
  );
};

export default Product;
