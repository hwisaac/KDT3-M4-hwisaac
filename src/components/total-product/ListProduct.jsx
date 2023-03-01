import React from 'react';
import style from './ListProduct.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ListProduct = ({ id, img, title, price, description, soldOut, grid }) => {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  const onClickHeart = () => {
    setHeart((prev) => !prev);
  };
  const onClickItem = (e) => {
    if (e.target.nodeName !== 'BUTTON' && !soldOut) {
      navigate(`/products/${id}`, { state: { id, title, img, price } });
    }
  };

  return (
    <li className={style[grid]} onClick={onClickItem}>
      {soldOut ? <div className={style.soldout}>SOLDOUT</div> : null}

      <div className={style.container}>
        <img className={style.img} src={img} alt={title} />
        <div>
          <p className={style.title}>{title}</p>
          <p className={style.price}>{price.toLocaleString()}원</p>
          <p className={style.description}>{description}...</p>
        </div>
      </div>

      <div>
        <button onClick={onClickHeart} className={heart ? style.btnHeart_red : style.btnHeart}>
          찜
        </button>
      </div>
    </li>
  );
};

export default ListProduct;
