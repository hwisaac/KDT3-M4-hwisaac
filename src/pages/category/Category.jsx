import React from 'react';
import Product from '../../components/total-product/Product';
import style from './Category.module.css';
import SortButton from '../../components/ui/button/SortButton';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import useFilter from '../../hooks/useFilter';
import { useQuery } from '@tanstack/react-query';
import { getCategorizedProducts, getProducts } from '../../api/productApi';
import { useParams } from 'react-router-dom';

export default function Category() {
  // const {loading, products, tag} = useProducts('category');
  
  const { tag } = useParams();
  const searchTags = [tag];
  const searchText = '';
  
  const {isLoading, error, data:products} = useQuery([searchTags], () => 
  tag === '전체상품' || tag === '베스트' ? getProducts() : getCategorizedProducts(searchText, searchTags)
  )
  // console.log('category', products)

  // const {filters, filter, setFilter, filtered} = useFilter(products);
  const response = useFilter(products);
  const {filters, filter, setFilter, filtered} = {...response};


  if (isLoading) return <LoadingModal />;
  if (error) return <p>Error ...</p>;
  return (
    <main className={style.main}>
      <h2 className={style.h2}>{tag}</h2>
      <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
      <ul className={style.product_wrap}>
        {filtered?.map((product) => (
          <Product key={product.id} id={product.id} title={product.title} img={product.thumbnail} price={product.price} />
        ))}
      </ul>
    </main>
  );
}
