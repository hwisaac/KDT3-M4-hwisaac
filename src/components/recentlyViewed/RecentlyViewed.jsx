import React from 'react'
import { useEffect, useState } from 'react'
import { getProductDetail } from '../total-product/fetch'
import style from './RecentlyViewed.module.css'

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const watchedProducts = JSON.parse(localStorage.getItem('watched')) 
  useEffect(() => {
    for(let i = 0; i < watchedProducts.length; i++) {
      let details = getProductDetail(watchedProducts[i])
      details.then((data) => {
        setProducts((curArr)=>[data, ...curArr])
      });
    }
  }, []) 

  return (
    <section className={style.recentlyViewed}>
      <h1>최근 본 상품</h1>
      <div className={style.products}>
        {
          products.map((product) => {
            return (
              <div key={product.id} className={style.product}>
                <img src={product.photo} alt={product.title}/>
                <h2>{product.title}</h2>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default RecentlyViewed
