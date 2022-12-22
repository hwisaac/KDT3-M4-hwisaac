import React from 'react';
import Product from '../components/total-product/Product';
import style from './Category.module.css';
import SortButton from '../components/button/SortButton';
import useProducts from '../hooks/use-products';
import LoadingModal from '../components/loading/LoadingModal';

export default function Category() {
  const [loading, error, products, filters, filter, setFilter, filtered, tag] = useProducts('category');

  if (loading) return <LoadingModal />;
  if (error) return <p>Error ...</p>;
  return (
    <main className={style.main}>
      <h2 className={style.h2}>{tag}</h2>
      <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
      <ul className={style.product_wrap}>
        {filtered.map((product) => (
          <Product id={product.id} title={product.title} img={product.thumbnail} price={product.price} />
        ))}
      </ul>
    </main>
  );
}
