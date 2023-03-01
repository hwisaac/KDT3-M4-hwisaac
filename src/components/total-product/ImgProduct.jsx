import React, { useState } from 'react';
import style from './ImgProduct.module.css';
import { Link } from 'react-router-dom';

const ImgProduct = ({ id, title, img, price, soldOut, description, grid }) => {
  const [heart, setHeart] = useState(false);

  const onClickHeart = () => {
    setHeart((prev) => !prev);
  };

  return (
    <li className={grid ? style[grid] : style.image}>
      {soldOut ? <div className={style.soldout}>SOLDOUT</div> : null}
      <div className={style.imgArea}>
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
      </div>

      <div className={style.txt}>
        <Link to={`/products/${id}`} state={{ id, title, img, price, soldOut }}>
          <p className={style.title}>{title}</p>
        </Link>

        <button onClick={onClickHeart} className={heart ? style.btnHeartSmall_red : style.btnHeartSmall}>
          찜
        </button>

        <p className={style.price}>{price.toLocaleString()}원</p>

        {grid ? <p className={style.description}>{description}</p> : null}
      </div>
    </li>
  );
};

export default ImgProduct;
