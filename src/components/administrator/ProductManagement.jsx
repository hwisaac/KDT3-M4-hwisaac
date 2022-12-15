import ProductCard from './ProductCard';
import style from './ProductManagement.module.css';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../../data/API';
import { useState, useEffect } from 'react';

const ProductManagement = () => {
  // const { products } = useLocation().state;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const products = getProducts();
    products.then((data) => {
      setProducts(data);
      console.log(products);
    });
  }, []);

  return (
    <ul className={style.productList}>
      전체선택
      {products.map((product, index) => {
        const { id, title, price, description, tags, isSoldOut, thumbnail } = product;
        return (
          <ProductCard
            key={`productCard-${id}`}
            index={index}
            title={title}
            price={price}
            description={description}
            tags={tags}
            isSoldOut={isSoldOut}
            thumbnail={thumbnail}
          />
        );
      })}
    </ul>
  );
};

export default ProductManagement;
