import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Product from '../components/total-product/Product';
import { getCategorizedProducts } from '../components/total-product/fetch';
import style from './Category.module.css';

export default function Category() {
  const { tag } = useParams();
  const searchText = '';
  const searchTags = [tag];
  const location = useLocation();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productsData = getCategorizedProducts(searchText, searchTags);
    productsData.then((data) => setProducts(data));
  }, [tag]);

  return (
    <main>
      <h2 className={style.h2}>{location.state?.name ? location.state.name : tag}</h2>
      <ul className={style.product_wrap}>
        {products.map((product) => (
          <Product id={product.id} title={product.title} img={product.thumbnail} price={product.price} />
        ))}
      </ul>
    </main>
  );
}
