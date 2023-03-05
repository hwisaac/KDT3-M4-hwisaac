import { useState } from 'react';

function getFilteredProducts (filter, products) {
  let copy = [...products];
  if (filter === "낮은 가격순") {
    copy.sort((a, b) => a.price - b.price);
  }
  if (filter === "높은 가격순") {
    copy.sort((a, b) => b.price - a.price);
  }
  return copy;
}

export default function useFilter (products) { 
  const filters = ['정확도순', '낮은 가격순', '높은 가격순'];
  const [filter, setFilter] = useState(filters[0]);
  if(!products) {
    console.log('products가 없습니다')
    return 
  }
  const filtered = getFilteredProducts(filter, products)

  return {filters, filter, setFilter, filtered};
}




