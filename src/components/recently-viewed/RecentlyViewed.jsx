import React from 'react';
import { useEffect, useState } from 'react';
import { getProductDetail } from '../../api/productApi';
import style from './RecentlyViewed.module.css';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const watchedProducts = JSON.parse(localStorage.getItem('watched'));
  useEffect(() => {
    // for(let i = 0; i < watchedProducts.length; i++) {
    //   let details = getProductDetail(watchedProducts[i])
    //   details.then((data) => {
    //     setProducts((curArr)=>[data, ...curArr])
    //   });
    // }

    // const a = async () => {
    //   for (let products of watchedProducts) {
    //     const data = await getProductDetail(products);
    //     console.log(data);
    //     setProducts((curArr) => [data, ...curArr]);
    //   }
    // };
    // a();

    if (watchedProducts) {
      for (let product of watchedProducts) {
        let details = getProductDetail(product);

        details.then((data) => {
          console.log(data);
          setProducts((curArr) => [data, ...curArr]);
        });
      }
    }
  }, []);
  console.log(products);

  return (
    <section className={style.recentlyViewed}>
      <h1>최근 본 상품</h1>
      {products.length === 0 ? (
        <div className={style.products}>최근 본 상품이 없습니다</div>
      ) : (
        <div className={style.products}>
          {products.map((product) => {
            return (
              <div key={product.id} className={style.product}>
                <img src={product.photo} alt={product.title} />
                <h3>{product.title}</h3>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentlyViewed;
