import React from 'react';
import { getSearch } from '../../api/productApi';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import useFilter from '../../util/useFilter';
import SortButton from '../../components/ui/button/SortButton';
import GridButton from '../../components/ui/button/GridButton';
import styled from 'styled-components';
import { CiSearch } from 'react-icons/ci';
import useGridFilter from '../../util/useGridFilter';
import { useForm } from 'react-hook-form';
import ProductWrap from '../../components/total-product/ProductWrap';

const Search = () => {
  const navigate = useNavigate();
  // 쿼리 값 가져오기
  const [searchParams] = useSearchParams();
  const title = searchParams.get('q');

  // 태그 탐색을 위한 태그데이터
  const TAGS = ['kitchen', 'cleaning', 'body', 'shaving'];

  let titleArr;
  let tag = TAGS.find((tag) => title.includes(tag));
  let findTitle;

  // 키워드가 두개이상 일 때 구분
  if (title.includes(' ')) {
    titleArr = title.split(' ');
    tag = TAGS.find((tag) => titleArr.includes(tag));
    findTitle = titleArr.find((t) => t !== tag);
  }

  // api 호출
  const { isLoading, data: search } = useQuery(
    ['search', title],
    () => {
      if (findTitle && tag) return getSearch(findTitle, tag);
      else if (tag) return getSearch('', tag);
      else return getSearch(title);
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: Infinity,
    },
  );

  // 정렬
  // const {filters, filter, setFilter, filtered} = useFilter(search)
  const response = useFilter(search);
  const { filters, filter, setFilter, filtered } = { ...response };

  // 그리드
  const { grids, grid, setGrid } = useGridFilter();

  // 보이는 목록수

  // 검색 input
  const { register, handleSubmit, setValue } = useForm();

  const onValid = ({ search }) => {
    navigate(`/search?q=${search}`);
    setValue('search');
  };
  const onInvalid = () => {
    return alert('검색어를 입력해주세요');
  };

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

            <Form onSubmit={handleSubmit(onValid, onInvalid)}>
              <input
                {...register('search', {
                  required: '검색어를 입력해주세요',
                })}
                type="search"
                placeholder="SEARCH"
              />
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

              <ProductWrap data={filtered} grid={grid} />
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
  padding-bottom: 30px;
  border-bottom: 1px solid var(--color-gray1);
`;

export default Search;
