import React from 'react';
import { useEffect, useState } from 'react';
import { getProductDetail } from '../../api/productApi';
import style from './RecentlyViewed.module.css';
import { useNavigate } from 'react-router-dom';

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

    if (watchedProducts) {
      Promise.all(
        watchedProducts.map(async (product) => {
          return getProductDetail(product);
        }),
      ).then((data) => {
        setProducts(data);
      });
    }

    //   if(watchedProducts){
    //     Promise.allSettled(watchedProducts.map(async product =>{
    //       return getProductDetail(product);
    //     })).then((data)=>{
    //       console.log('data', data)
    //       setProducts(data);
    //     }).catch((error) => console.log(error))
    //   }
  }, [watchedProducts]);

  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate(`/products/${event.target.className}`);
  };

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
                <img src={product.photo} alt={product.title} className={product.id} onClick={handleClick} />
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
