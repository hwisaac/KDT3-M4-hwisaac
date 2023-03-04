import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BuyItem = ({ id, photo, title, quantity, price }) => {
  return (
    <ProductItem>
      <img src={photo} alt={title} />
      <ProductText>
        <Link to={`/products/${id}`} state={{ id }}>
          <h2>{title}</h2>
        </Link>
        <p>
          <span>{quantity} EA</span>
          <span>$ {(price * quantity).toLocaleString()}</span>
        </p>
      </ProductText>
    </ProductItem>
  );
};

const ProductItem = styled.li`
  display: flex;
  width: 100%;
  padding: 30px 0;
  img {
    width: 150px;
  }
`;
const ProductText = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-weight: 500;
  }
  span {
    margin-right: 30px;
  }
`;

export default BuyItem;
