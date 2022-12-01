import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="inner">
        <div className="logoUtil">
          <div className="logo">
            <a href="https://www.naver.com/" className="naver"><span>NAVER</span></a>
            <a href="https://shopping.naver.com/home" className="shopping"><span>네이버 쇼핑</span></a>
          </div>
          <div className="util">
            <Link to='/mypage' className='myPage'>마이페이지</Link>
            <Link to='/mycart' className='myCart'>장바구니</Link>
            <span>사용자</span>
          </div>
        </div>
        <div className="seller">
          <div className="sellerInfo">
             <a href="https://smartstore.naver.com/freshmentor/profile" className="curation">
              <div className="imgBox">
                <img src="https://shop-phinf.pstatic.net/20191031_145/1572507325623D6htg_PNG/9868064258605110_767066992.png?type=m120" alt="장바구니" />
                <p>맛그레이드하세요↗ 식품전문가 프레시멘토의 큐레이션 서비스</p>
              </div>
            </a> 
            <div className="customerNumber">관심고객수 117,891</div>
          </div>
          <div className="inputBox">
            <input type="search" placeholder='검색어를 입력해보세요'/>
          </div>
        </div>
        <div className="mainLogo">
          <div className="imgBox">
            <img src="https://shop-phinf.pstatic.net/20191031_66/15725072755036s6lm_PNG/60561378898368862_1948914938.png?type=w640" alt="FRESH MENTOR" />
          </div>
        </div>
      </div>
    </header>
  );
}
