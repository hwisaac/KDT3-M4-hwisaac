import React from 'react';
import style from './TotalProduct.module.css';
import Product from './Product';
import SortButton from '../button/SortButton';
import useProducts from '../../hooks/use-products';

const TotalProduct = () => {
  const [loading, error, products, filters, filter, setFilter, filtered] = useProducts('total')
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error ...</p>
  return (
    <div className={style.total}>
      <h1 className={style.title}>프레시멘토 전체상품</h1>
      <SortButton 
        filter={filter}
        filters={filters}
        onFilterChange={(filter) => setFilter(filter)}
        />
      <ul className={style.product_wrap}>
        {filtered.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            img={product.thumbnail}
            price={product.price}
            filter={filter}
          />
        ))}
      </ul>
    </div>
  );
};

export default TotalProduct;