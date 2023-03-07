import { useState } from 'react';

function getFilteredProducts(filter, products) {
  let copy = [...products];
  if (filter === 'Price : Low to High') {
    copy.sort((a, b) => a.price - b.price);
  }
  if (filter === 'Price : High to Low') {
    copy.sort((a, b) => b.price - a.price);
  }
  return copy;
}

export default function useFilter(products) {
  const filters = ['Best Selling', 'Price : Low to High', 'Price : High to Low'];
  const [filter, setFilter] = useState(filters[0]);
  if (!products) {
    console.log('products가 없습니다');
    return;
  }
  const filtered = getFilteredProducts(filter, products);

  return { filters, filter, setFilter, filtered };
}
