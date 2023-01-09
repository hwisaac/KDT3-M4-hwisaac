import React from 'react';
import { getSearch } from '../../api/productApi';
import { useSearchParams } from 'react-router-dom';
import SearchItem from '../../components/search/SearchItem';
import style from './Search.module.css';
import { useQuery } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import useFilter from '../../hooks/useFilter';
import SortButton from '../../components/ui/button/SortButton';

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
  const {
    isLoading,
    data: search,
  } = useQuery([title], () => {
    if (findTitle && tag) return getSearch(findTitle, tag);
    else if (tag) return getSearch('', tag);
    else return getSearch(title);
  })

  // const {filters, filter, setFilter, filtered} = useFilter(search)
  const response = useFilter(search);
  const {filters, filter, setFilter, filtered} = {...response}


  return (
    <div className={style.wrap}>
      {isLoading ? (
        <LoadingModal />
      ) : search.length === 0 ? (
        <p className={style.none}>입력하신 '{title}'에 대한 스토어 내 검색결과가 없습니다.</p>
      ) : (
        <div>
          <div className={style.head}>
            <h1>{title}</h1> <span>검색 결과(총 {search.length}개)</span>
          </div>
          <SortButton filter={filter} filters={filters} onFilterChange={(filter) => setFilter(filter)} />
          <ul>
            {filtered?.map((data) => (
              <SearchItem
                key={data.id}
                id={data.id}
                img={data.thumbnail}
                title={data.title}
                price={data.price}
                description={data.description}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
