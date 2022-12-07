import React from 'react';
import { useState, useEffect } from 'react';
import style from './TotalProduct.module.css';
import Product from './Product';
import { getProducts } from './fetch';

const TotalProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsData = getProducts();
    productsData.then((data) => {
      // console.log('fetching...');
      setProducts(data);
    });
  }, []);

  return (
    <div className={style.total}>
      <h1 className={style.title}>프레시멘토 전체상품</h1>
      <ul className={style.btns}>
        <li className={style.btn_wrap}>
          <button className={style.btn}>낮은 가격순</button>
        </li>
        <li>
          <button className={style.btn}>높은가격순</button>
        </li>
      </ul>

      <ul className={style.product_wrap}>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            img={product.thumbnail}
            price={product.price}
          />
        ))}
      </ul>
    </div>
  );
};

export default TotalProduct;
