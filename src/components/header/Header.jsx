import { useRecoilState } from 'recoil';
import { authUrl, HEADERS_USER } from '../../api/commonApi';
import { loginState, userInfoState, alternativeImg, getCookie, deleteCookie } from '../../recoil/userInfo';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import style from './Header.module.css';
import { BiSearch } from 'react-icons/bi';
import { adminUser } from '../../api/adminUser';
import RecentlyViewed from '../recently-viewed/RecentlyViewed';
import { useForm } from 'react-hook-form';
import UserMenu from '../ui/user-menu/UserMenu';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [home, setHome] = useState(true);
  const accessToken = getCookie('accessToken');
  const { isAdmin } = userInfo;

  //프레시멘토 로고를 홈화면에서만 보이도록 변경
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname != '/') {
      setHome(false);
    }
    if (pathname === '/') {
      setHome(true);
    }
  }, [pathname]);

  const onClick = async () => {
    try {
      const res = await fetch(`${authUrl}/logout`, {
        method: 'POST',
        headers: { ...HEADERS_USER, Authorization: accessToken },
      });
      const json = await res.json();
      if (json) {
        console.log(json);
        deleteCookie('accessToken');
        setIsLoggedIn(false);
        setUserInfo({
          email: '',
          displayName: '',
          profileImg: '',
        });
      }
      document.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
  };

  /* 검색 기능 */
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();
  const onValid = ({ search }) => {
    navigate(`/search?q=${search}`);
    setValue('search');
  };
  const onInvalid = () => {
    return alert('검색어를 입력해주세요');
  };

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
            {isLoggedIn ? (
              <>
                <UserMenu text={'마이페이지'} link={'/mypage'} />
                {isAdmin && <UserMenu text={'관리자 페이지'} link={'/admin/products'} />}
                <UserMenu text={'장바구니'} link={'/mycart'} />
                <UserMenu text={'찜한 상품'} link={'/myKeepProducts'} />
                <span className={style.util_list}>{userInfo.displayName}님</span>
                <img
                  src={userInfo.profileImg ? userInfo.profileImg : alternativeImg}
                  className={style.image}
                  alt="유저이미지"
                ></img>
                <span className={style.util_list} onClick={onClick}>
                  로그아웃
                </span>
              </>
            ) : (
              <>
                <UserMenu text={'로그인'} link={'/login'} />
                <UserMenu text={'회원가입'} link={'/signup'} />
              </>
            )}
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

          {/* 검색 */}
          <form onSubmit={handleSubmit(onValid, onInvalid)} className={style.form}>
            <input
              {...register('search', {
                required: '검색어를 입력해주세요',
              })}
              type="search"
            />
            <button type="submit">
              <BiSearch className={style.searchIcon} />
            </button>
          </form>
        </div>
      </div>
      {home ? (
        <div className={style.mainLogo}>
          <Link to="/">
            <img
              src="https://shop-phinf.pstatic.net/20191031_66/15725072755036s6lm_PNG/60561378898368862_1948914938.png?type=w640"
              alt="FRESH MENTOR"
            />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
