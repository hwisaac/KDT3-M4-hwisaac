import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Header.module.css';
import { BiSearch } from "react-icons/bi"

export default function Header() {
  const [value, setValue] = useState('');

  const onKeyDown = (event) => {
    let inputValue = event.target.value;
    if (event.key === 'Enter' && !event.isComposing) {
      if (inputValue !== '') {
        setValue(inputValue.trim());
      } else {
        alert('검색어를 입력해주세요');
      }
    }
  };

  // form 으로 보낼 주소 확인
  const URL = useLocation();

  return (
    <header className={style.header}>
      <div className={style.headerLogoUtil}>
        <div className={`${style.inner}`}>
          <div className={style.logo}>
            <Link to="/" className={style.naver}>
              <span>NAVER</span>
            </Link>
            <Link to="/" className={style.shopping}>
              <span>네이버 쇼핑</span>
            </Link>
          </div>
          <div className={style.util}>
            <Link to="/mypage" className={style.myPage}>
              마이페이지
            </Link>
            <Link to="/mycart" className={style.myCart}>
              장바구니
            </Link>
            <Link to="/login" className={style.login}>
              로그인
            </Link>
            <Link to="/signup" className={style.signup}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
      <div className={style.linkInput}>
        <div className={`${style.inner}`}>
          <div className={`${style.linkBox}`}>
            <img
                src="https://shop-phinf.pstatic.net/20191031_145/1572507325623D6htg_PNG/9868064258605110_767066992.png?type=m120"
                alt="장바구니"
              />
            <p>맛그레이드하세요↗ 식품전문가 프레시멘토의 큐레이션 서비스</p>
            <span className={style.customerNumber}>관심고객수 117,891</span>
          </div>
          <div className={style.col}>
            <form action={URL.pathname.includes('search') ? `${value}` : `search/${value}`}>
              <input onKeyDown={onKeyDown} type="search" placeholder="검색어를 입력해보세요" />
            </form>
          </div>
        </div>
        <div className={style.mainLogo}>
          <Link to="/">
            <img
              src="https://shop-phinf.pstatic.net/20191031_66/15725072755036s6lm_PNG/60561378898368862_1948914938.png?type=w640"
              alt="FRESH MENTOR"
            />
          </Link>
        </div>
    </header>
  );
}
