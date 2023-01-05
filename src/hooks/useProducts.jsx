import { useState, useEffect } from 'react';
import { getProducts, getCategorizedProducts } from './../api/productApi';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function useProducts(sort) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  const { tag } = useParams();
  const searchText = '';
  const searchTags = [tag];
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    let productsData;
    sort === 'total'
      ? (productsData = getProducts())
      : tag === '전체상품' || tag === '베스트'
      ? (productsData = getProducts())
      : (productsData = getCategorizedProducts(searchText, searchTags));
    productsData
      .then((data) => {
        // console.log('fetching...');
        setProducts(data);
      })
      .catch((e) => setError('에러가 발생했습니다'))
      .finally(() => setLoading(false));
  }, [tag]);

  return {loading, error, products, tag, category};
}
