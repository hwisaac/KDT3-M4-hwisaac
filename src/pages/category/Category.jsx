import React, { useState } from 'react';
import Product from '../../components/total-product/Product';
import style from './Category.module.css';
import SortButton from '../../components/ui/button/SortButton';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import useFilter from '../../hooks/useFilter';
import { useQuery } from '@tanstack/react-query';
import { getCategorizedProducts, getProducts } from '../../api/productApi';
import { useParams } from 'react-router-dom';
import GridButton from './../../components/ui/button/GridButton';

export default function Category() {
  // const {loading, products, tag} = useProducts('category');

  const { tag } = useParams();
  const searchTags = [tag];
  const searchText = '';

  const {
    isLoading,
    error,
    data: products,
  } = useQuery([searchTags], () =>
    tag === '전체상품' || tag === '베스트' ? getProducts() : getCategorizedProducts(searchText, searchTags),
  );
  // console.log('category', products)

  // const {filters, filter, setFilter, filtered} = useFilter(products);
  const response = useFilter(products);
  const { filters, filter, setFilter, filtered } = { ...response };

  // 그리드 정렬
  const grids = ['list', 'image', 'bigImage', 'gallery'];
  const [grid, setGrid] = useState('image');
  const [select, setSelect] = useState('image');

  if (isLoading) return <LoadingModal />;
  if (error) return <p>Error ...</p>;
  return (
    <main className={style.main}>
      <h2 className={style.h2}>{tag}</h2>
      <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
        <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
        <ul className={style.gridWrap} style={{ display: 'flex' }}>
          {grids.map((grid) => (
            <GridButton key={grid} grid={grid} setGrid={setGrid} select={select} setSelect={setSelect} />
          ))}
        </ul>
      </div>

      <ul className={style[`${grid}_items`]}>
        {filtered?.map((data) => (
          <Product key={data.id} data={data} grid={grid} />
        ))}
      </ul>
    </main>
  );
}
