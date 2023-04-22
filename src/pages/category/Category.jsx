import React, { useState } from 'react';
import SortButton from '../../components/ui/button/SortButton';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import useFilter from '../../util/useFilter';
import { useQuery } from '@tanstack/react-query';
import { getCategorizedProducts } from '../../api/productApi';
import { useParams } from 'react-router-dom';
import GridButton from './../../components/ui/button/GridButton';
import useGridFilter from '../../util/useGridFilter';
import styled from 'styled-components';
import ProductWrap from './../../components/total-product/ProductWrap';

export default function Category() {
  const { tag } = useParams();

  const { isLoading, error, data: products } = useQuery([tag], () => getCategorizedProducts('', [tag]));

  const response = useFilter(products);
  const { filters, filter, setFilter, filtered } = { ...response };

  // 그리드 정렬
  const { grids, grid, setGrid } = useGridFilter();

  if (isLoading) return <LoadingModal />;
  if (error) return <p>Error ...</p>;
  return (
    <Wrapper>
      <TextArea>
        browse all of our reusable and plastic free
        <br />
        products that we have designed to help you
        <br />
        live a more sustainable lifestyle.
      </TextArea>
      <MenuBar>
        <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
        <GridButton grids={grids} grid={grid} setGrid={setGrid} />
      </MenuBar>

      <ProductWrap data={filtered} grid={grid} />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 1200px;
  margin: 100px auto;
  font-family: 'Pangram';
`;

const TextArea = styled.div`
  margin-bottom: 100px;
  text-align: center;
  font-family: 'Fahkwang';
  font-size: 20px;
`;

const MenuBar = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--color-gray1);
`;
