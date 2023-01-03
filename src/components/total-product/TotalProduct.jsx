import React from 'react';
import style from './TotalProduct.module.css';
import Product from './Product';
import SortButton from '../ui/button/SortButton';
import useProducts from '../../hooks/useProducts';
import LoadingModal from './../ui/loading/LoadingModal';

const TotalProduct = () => {
  const [loading, error, products, filters, filter, setFilter, filtered] = useProducts('total');

  return (
    <>
      {error ? (
        <p>Error...</p>
      ) : loading ? (
        <LoadingModal />
      ) : (
        <div className={style.total}>
          <h1 className={style.title}>프레시멘토 전체상품</h1>
          <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
          <ul className={style.product_wrap}>
            {filtered.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                img={product.thumbnail}
                price={product.price}
                filter={filter}
                soldOut={product.isSoldOut}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TotalProduct;
