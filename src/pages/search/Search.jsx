import React, { useState } from 'react';
import { getSearch } from '../../api/productApi';
import { useSearchParams } from 'react-router-dom';
import ListProduct from '../../components/total-product/ListProduct';
import style from './Search.module.css';
import { useQuery } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import useFilter from '../../hooks/useFilter';
import SortButton from '../../components/ui/button/SortButton';
import Product from './../../components/total-product/Product';
import GridButton from '../../components/ui/button/GridButton';
import styled from 'styled-components';
import { CiSearch } from 'react-icons/ci';
import useGridFilter from './../../hooks/useGridFilter';

const Search = () => {
  // 쿼리 값 가져오기
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('q');

  // 태그 탐색을 위한 태그데이터
  const TAGS = [
    '농산물',
    '과일',
    '채소',
    '곡물',
    '수산물',
    '제철',
    '건어물',
    '축산물',
    '가공식품',
    '일반',
    '반찬',
    '차류',
    '벌꿀',
    '간편간식',
  ];

  // 키워드가 두개이상 일 때 구분
  let titleArr;
  let tag = TAGS.find((tag) => title.includes(tag));
  let findTitle;
  if (title.includes(' ')) {
    titleArr = title.split(' ');
    tag = TAGS.find((tag) => titleArr.includes(tag));
    findTitle = titleArr.find((t) => t !== tag);
  }

  // api 호출
  const { isLoading, data: search } = useQuery([title], () => {
    if (findTitle && tag) return getSearch(findTitle, tag);
    else if (tag) return getSearch('', tag);
    else return getSearch(title);
  });

  // 정렬
  // const {filters, filter, setFilter, filtered} = useFilter(search)
  const response = useFilter(search);
  const { filters, filter, setFilter, filtered } = { ...response };

  // 그리드
  const { grids, grid, setGrid } = useGridFilter();

  // 보이는 목록수

  return (
    <>
      {isLoading ? (
        <LoadingModal />
      ) : (
        <Wrapper>
          <Header>
            <Text>
              <h1>PRODUCT SEARCH</h1>
              {search.length === 0 ? (
                <p>No results could be found for "{title}"</p>
              ) : (
                <p>
                  {search.length} results for "{title}"
                </p>
              )}
            </Text>

            <Form>
              <input type="text" placeholder="SEARCH" />
              <button type="submit">
                <CiSearch size={28} />
              </button>
            </Form>
          </Header>

          {search.length === 0 ? null : (
            <Main>
              <MenuBar>
                <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
                <GridButton grids={grids} grid={grid} setGrid={setGrid} />
              </MenuBar>
              <ul className={style[`${grid}_items`]}>
                {filtered?.map((data) => (
                  <Product key={data.id} data={data} grid={grid} />
                ))}
              </ul>
            </Main>
          )}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 1200px;
  margin: 100px auto;
  font-family: 'Pangram';
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin-bottom: 30px;
  text-align: center;
  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const Form = styled.form`
  position: relative;
  width: 40%;
  display: flex;
  input {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    font-weight: 400;
    font-size: 20px;
    ::placeholder {
      color: var(--color-gray2);
    }
  }
  button {
    position: absolute;
    right: 0;
    outline: none;
    border: none;
    background-color: var(--color-white);
    cursor: pointer;
  }
`;

const Main = styled.div``;

const MenuBar = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-gray1);
`;

export default Search;
