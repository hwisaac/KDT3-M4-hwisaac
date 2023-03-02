import React, { useState } from 'react';
import style from './ImgProduct.module.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImgProduct = ({ id, title, img, price, soldOut, description, grid }) => {
  return (
    <li className={grid ? style[grid] : style.image}>
      {soldOut ? <div className={style.soldout}>SOLDOUT</div> : null}
      <div className={style.imgArea}>
        <Link to={`/products/${id}`} state={{ id, title, img, price, soldOut }}>
          <img src={img} alt={title} />
        </Link>
      </div>

      <div className={style.txt}>
        <Link to={`/products/${id}`} state={{ id, title, img, price, soldOut }}>
          <p className={style.title}>{title}</p>
        </Link>
        <p className={style.price}>{price.toLocaleString()}원</p>
      </div>
    </li>
  );
};

export default ImgProduct;
