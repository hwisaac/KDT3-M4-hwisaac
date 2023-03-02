import React from 'react';
import Product from './Product';
import styled from 'styled-components';

const ProductWrap = ({ data, grid }) => {
  return (
    <Wrap grid={grid}>
      {data?.map((item) => (
        <Product key={item.id} {...item} grid={grid} />
      ))}
    </Wrap>
  );
};

const gridStyle = {
  list: {
    template: '',
  },
  image: {
    template: 'repeat(5, 1fr)',
  },
  bigImage: {
    template: 'repeat(4, 1fr)',
  },
  gallery: {
    template: 'repeat(3, 1fr)',
  },
};

const Wrap = styled.ul`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: ${({ grid }) => (grid ? gridStyle[grid].template : 'repeat(5, 1fr)')};
  grid-gap: 30px;
`;

export default ProductWrap;
