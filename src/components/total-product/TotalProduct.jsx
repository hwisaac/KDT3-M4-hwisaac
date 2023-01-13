import React from 'react';
import style from './TotalProduct.module.css';
import Product from './Product';
import SortButton from '../ui/button/SortButton';
import LoadingModal from './../ui/loading/LoadingModal';
import useFilter from '../../hooks/useFilter';
import RecentlyViewed from '../recently-viewed/RecentlyViewed';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/productApi';

const TotalProduct = () => {
  // const { loading, error, products} = useProducts('total');
  const {isLoading, error, data:products} = useQuery(['total'], () => getProducts())

  //가격순 상품 재정렬
  const reponse = useFilter(products)
  const {filters, filter, setFilter, filtered} = {...reponse}

  return (
    <>
      {error ? (
        <p>Error...</p>
      ) : isLoading ? (
        <LoadingModal />
      ) : (
        <div className={style.total}>
          <h1 className={style.title}>프레시멘토 전체상품</h1>
          <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
          <ul className={style.product_wrap}>
            {filtered?.map((product) => (
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
      <RecentlyViewed/>
    </>
  );
};

export default TotalProduct;
