import React from 'react';
import { useState, useEffect } from 'react';
import { getSearch } from '../components/total-product/fetch';
import SearchItem from './SearchItem';
import style from './Search.module.css';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('s');

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
    findTitle = titleArr.find((title) => TAGS.find((tag) => tag !== title));
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
            {/* 클릭 시 li 에 줘야 할 효과: style.btn_select */}
            <li className={style.btn_wrap}>
              <button>정확도순</button>
            </li>
            <li className={style.btn_wrap}>
              <button>낮은가격순</button>
            </li>
            <li className={style.btn_wrap}>
              <button>높은가격순</button>
            </li>
          </ul>
          <ul>
            {search.map((data) => (
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
