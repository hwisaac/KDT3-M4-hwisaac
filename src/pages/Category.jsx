import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/total-product/Product';
import { getProducts } from '../fetch';

export default function Category() {
  const { tag } = useParams();
  const searchText = '';
  const searchTags = [tag];
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productsData = getProducts(searchText, searchTags);
    productsData.then((data) => setProducts(data));
  }, [tag]);
  return (
    <main>
      <h2>{tag}</h2>
      <ul>
        {products.map((product) => (
          <Product key={product.id} title={product.title} img={product.thumbnailUrl} />
        ))}
      </ul>
    </main>
  );
}
