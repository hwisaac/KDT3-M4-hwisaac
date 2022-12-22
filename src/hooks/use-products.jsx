import { useState, useEffect } from 'react';
import { getProducts, getCategorizedProducts } from './../data/API';
import { useParams } from 'react-router-dom';

export default function useProducts(sort) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  const filters = ['정확도순', '낮은 가격순', '높은 가격순'];
  const [filter, setFilter] = useState(filters[0]);
  const filtered = getFilteredProducts(filter, products);
  const { tag } = useParams();
  const searchText = '';
  const searchTags = [tag];
  const [category, setCategory] = useState([]);
  const [select, setSelect] = useState(filter[0]);

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

  return [loading, error, products, filters, filter, setFilter, filtered, tag, category];
}

function getFilteredProducts(filter, products) {
  if (filter === '정확도순') {
    return products;
  } else if (filter === '낮은 가격순') {
    let copyLow = [...products];
    copyLow.sort(function (a, b) {
      return a.price - b.price;
    });
    return copyLow;
  } else if (filter === '높은 가격순') {
    let copyHigh = [...products];
    copyHigh.sort(function (a, b) {
      return b.price - a.price;
    });
    return copyHigh;
  }
}
