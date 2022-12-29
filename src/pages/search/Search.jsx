import React from 'react';
import { useState, useEffect } from 'react';
import { getSearch } from '../../api/productApi';
import { useSearchParams } from 'react-router-dom';
import SearchItem from '../../components/search/SearchItem';
import style from './Search.module.css';

const Search = () => {
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  // location 의 ?s=title 가져오기
  let [searchParams, setSearchParams] = useSearchParams();
  let title = searchParams.get('s');

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
  } else if (!title.includes(' ') && tag) {
    title = tag;
  }

  // 구분해서 search data 넣기
  useEffect(() => {
    if (findTitle && tag) {
      const searchData = getSearch(findTitle, tag);
      searchData.then((data) => {
        setSearch(data);
        setLoading(false);
      });
    } else if (!findTitle && tag) {
      const searchData = getSearch('', tag);
      searchData.then((data) => {
        setSearch(data);
        setLoading(false);
      });
    } else {
      const searchData = getSearch(title);
      searchData.then((data) => {
        setSearch(data);
        setLoading(false);
      });
    }
  }, []);

  const filters = ['정확도순', '낮은 가격순', '높은 가격순'];
  const [filter, setFilter] = useState(filters[0]);
  const filtered = getFilteredProducts(filter, search);

  function getFilteredProducts(filter, search) {
    if (filter === '정확도순') {
      return search;
    } else if (filter === '낮은 가격순') {
      let copyLow = [...search];
      copyLow.sort(function (a, b) {
        return a.price - b.price;
      });
      return copyLow;
    } else if (filter === '높은 가격순') {
      let copyHigh = [...search];
      copyHigh.sort(function (a, b) {
        return b.price - a.price;
      });
      return copyHigh;
    }
  }

  return (
    <div className={style.wrap}>
      {loading ? (
        ''
      ) : search.length === 0 ? (
        <p className={style.none}>입력하신 '{title}'에 대한 스토어 내 검색결과가 없습니다.</p>
      ) : (
        <div>
          <div className={style.head}>
            <h1>{title}</h1> <span>검색 결과(총 {search.length}개)</span>
          </div>
          <ul className={style.btns}>
            {filters.map((filter, index) => {
              return (
                <li className={style.btn_wrap} key={index}>
                  <button onClick={() => setFilter(filter)}>{filter}</button>
                </li>
              );
            })}
          </ul>
          <ul>
            {filtered.map((data) => (
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
