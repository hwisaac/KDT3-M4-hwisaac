import React from 'react';
import { useLocation } from 'react-router-dom';

export default function MyBuy() {
  const { state: buyProduct } = useLocation();
  // buyProduct가 여러개일 경우 products로 할당함, 아닐 경우 product에 할당
  const products = buyProduct && buyProduct.length > 0 && buyProduct;
  const product = buyProduct && buyProduct.length === undefined && buyProduct;
  console.log('products:', products);
  console.log('product:', product);
  return <div>구매페이지</div>;
}
