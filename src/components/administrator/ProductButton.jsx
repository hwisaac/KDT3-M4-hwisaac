import React from 'react';
import style from './ProductCard.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductButton = ({ name, color }) => {
  // const [heart, setHeart] = useState(false);
  // const navigate = useNavigate();
  // function onClick() {
  //   setHeart((prev) => !prev);
  // }
  return <button>{name}</button>;
};

export default ProductButton;
