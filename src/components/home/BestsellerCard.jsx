import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatPrice } from 'utils/util';

const BestsellerCard = ({ product }) => {
  const { id, title, price, description, thumbnail, photo } = product;
  const [toggleCover, setToggleCover] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setToggleCover((prev) => !prev);
    navigate(`/products/${id}`);
  };
  return (
    <CardWrapper onClick={handleClick}>
      <img src={photo} />

      <CardCover
        initial={{
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{
          duration: 0.3,
        }}
      >
        <h4 className="fah">{title}</h4>
        <span>{formatPrice(price)}</span>
      </CardCover>
    </CardWrapper>
  );
};

export default BestsellerCard;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const CardCover = styled(motion.div)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  h4 {
    color: white;
    font-weight: 200;
    text-align: center;
    font-size: 20px;
  }
  span {
    color: white;
    /* font-weight: 200; */
  }
`;
