import React from 'react';
import Product from '../../components/total-product/Product';
import style from './Category.module.css';
import SortButton from '../../components/ui/button/SortButton';
import useProducts from '../../hooks/useProducts';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import useFilter from '../../hooks/useFilter';

export default function Category() {
  const { loading, error, products, tag } = useProducts('category');
  const { filters, filter, setFilter, filtered } = useFilter(products);

  if (loading) return <LoadingModal />;
  if (error) return <p>Error ...</p>;
  return (
    <main className={style.main}>
      <h2 className={style.h2}>{tag}</h2>
      <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
      <ul className={style.product_wrap}>
        {filtered?.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            img={product.thumbnail}
            price={product.price}
            soldOut={product.isSoldOut}
          />
        ))}
      </ul>
    </main>
  );
}
