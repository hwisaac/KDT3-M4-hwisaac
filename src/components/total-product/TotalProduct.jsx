import React from 'react';
import style from './TotalProduct.module.css';
import productData from '../../data/product.json';
import Product from './Product';

const TotalProduct = () => {
  return (
    <div className={style.total}>
      <h1 className={style.title}>프레시멘토 전체상품</h1>
      <ul className={style.btns}>
        <li className={style.btn_wrap}>
          <button className={style.btn}>인기도순</button>
        </li>
        <li className={style.btn_wrap}>
          <button className={style.btn}>누적 판매순</button>
        </li>
        <li className={style.btn_wrap}>
          <button className={style.btn}>낮은 가격순</button>
        </li>
        <li className={style.btn_wrap}>
          <button className={style.btn}>최신등록순</button>
        </li>
        <li className={style.btn_wrap}>
          <button className={style.btn}>리뷰 많은 순</button>
        </li>
        <li className={style.btn_wrap}>
          <button className={style.btn}>평점 높은순</button>
        </li>
      </ul>

      <ul className={style.product_wrap}>
        {productData.map((product) => (
          <Product key={product.id} title={product.title} img={product.thumbnailUrl} />
        ))}
      </ul>
    </div>
  );
};

export default TotalProduct;
