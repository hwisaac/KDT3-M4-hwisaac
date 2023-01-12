import React from 'react';
import style from './Product.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Product = ({ id, title, img, price, soldOut }) => {
  const [heart, setHeart] = useState(false);

  const onClickHeart = () => {
    setHeart((prev) => !prev);
  };

  return (
    <li className={style.wrap}>
      {soldOut ? <div className={style.soldout}>SOLDOUT</div> : null}
      <Link to={`/products/${id}`} state={{ id, title, img, price, soldOut }}>
        <img className={style.img} src={img} alt={title} />
      </Link>
      <div className={style.btns}>
        {soldOut ? null : (
          <button onClick={onClickHeart} className={heart ? style.btnHeartBig_red : style.btnHeartBig}>
            찜
          </button>
        )}
      </div>
      <div className={style.txt}>
        <Link to={`/products/${id}`} state={{ id, title, img, price, soldOut }}>
          <p className={style.title}>{title}</p>
        </Link>

        <button onClick={onClickHeart} className={heart ? style.btnHeartSmall_red : style.btnHeartSmall}>
          찜
        </button>

        <p className={style.price}>{price.toLocaleString()}원</p>
      </div>
    </li>
  );
};

export default Product;
