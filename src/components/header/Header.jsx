import { useRecoilState, useRecoilValue } from 'recoil';
import { authUrl, HEADERS_USER } from '../../data/API';
import { loginState, userInfoState } from '../../data/LoginData';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './Header.module.css';
import { BiSearch } from 'react-icons/bi';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const onClick = async () => {
    try {
      const res = await fetch(`${authUrl}/logout`, {
        method: 'POST',
        headers: { ...HEADERS_USER, Authorization: userInfo.accessToken },
      });
      const json = await res.json();
      if (json) {
        setIsLoggedIn(false);
        setUserInfo({
          user: {
            email: '',
            displayName: '',
            profileImg: '',
          },
          accessToken: '',
        });
      }
      document.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
  };

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
            <Link to="/mypage" className={style.util_list}>
              마이페이지
            </Link>
            <Link to="/mycart" className={style.util_list}>
              장바구니
            </Link>
            {isLoggedIn ? (
              <>
                <span className={style.util_list}>{userInfo.user.displayName}님</span>
                <img
                  src={
                    userInfo.user.profileImg
                      ? userInfo.user.profileImg
                      : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHBhAIBw8OFRUODw8QEBMSEBAPEA4SFhMWFhYSFx8YHTQgGRoxHRMTITEhJSkuLi4uFx8zODMsNyktLisBCgoKDg0OGhAQGjYlHyU1Ky0tKy0wKy0tLi0tLS0rLS0tLS0tLS0tKy03NystLSsrNS0tLS03Kzc3LS0rLS0tN//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMxABAAECAwUFBwQDAQAAAAAAAAECAwQRcQUhMTJBEhNRYXI0gZGhsdHhIkKSwSMzghT/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAcEQEBAQEBAQEBAQAAAAAAAAAAAQIRAzESQSH/2gAMAwEAAhEDEQA/AOsAe980AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHvHgscLs/d27/8fu5bx2S1At2qrk5W4mdISKdn3J6RGs/ZbUxFMZUxlo9Y/ak84qJ2fcjhETpLRcs1Wv8AZTMfRfExnGUn7L5xzotMVs+Ko7VjdPh0nTwVkx2Zyno3L1O5seAOuAAAAAAAAAAAAAAAAAAANlm33t2KI6yCds3DZR39f/Pl5rAiMoyjoJW9Xk5ABx0AAQto4bt0d7Rxjj5wmhLws7HOjdirXc36qI8d2ktKzzgAAAAAAAAAAAAAAAAACZsunPE5+FMz/X9oabsqcsRMeNM/WHNfHc/VqAkuAAAAAAq9rU5XqavGnL4T+UFYbWn/ACUx5T9fwr1c/ENfQB1wAAAAAAAAAAAAAAAAbsJc7rEU1T45TpO5pAjohFwGI7612auNO6fOPFKRv+PRL0AAAABoxl/uLOccZ3U/cLeK3H3O8xU5dP0/D85oz14tHnt6AAAAAAAAAAAAAAAAAAAAztXJtVxXRxhcYXFU4iMuE9Y+ykexOW+HLOu51x0IqLW0K7cZVZVa8fik07Tp/dTV7piWPzVZuJwgztOn9tNXvyhHu7Qrr3UZU6b5c/NLuLDEYmmxT+rj0jrKnvXZvXO3X+IjwYTPanOp4pM8T1roA6yAAAAAAAAAAAAAAAAAAAAAADKmmauWJnSM2cWK54UV/wAZBqG2cPXHGiv+MsJomnmiY1jIOMQAAAAAAAAAAAAAAAAAAABnatTdq7NuM/6WVjZ0U772+fDp+XLZHZm1W0W5uTlREzpCVb2dVVvrmI+crSmmKYypiI03PWLtSec/qJb2dRTzZz78o+TfRYoo5aafhvbBztakkAHHQAGFVmmvmppn3Q0V7Poq4RMaT90oOlkqsubNmN9uqJ13SiXbNVqcrkTH0XxMZxlLU1WLiOdFtf2fTXvt/pn5K69Yqs1ZXI0npLcsqdzY1AOuAAAAAAAAAADdhcPOIudmOEcZ8GleYSz3NiKevGdXNXjWc9rOzaizR2bcfedWYJLAAAAAAAAAAAADyuiK6ezXGcS9AU2Mwv8A56s6eWeHl5Iy/vW4u2poq6/LzUMx2ZynpuUzeo7zyvAGmQAAAAAAAHtPNGroXPU80aw6FjanmAMKAAAAAAAAAAAAAACixW7E1+qfqvVHi/aq/VLeGPT40gNpAAAAAAAAMqeaNYdA5+nmjWHQMbU8wBhQAAAAAAAAAAAAAAUeL9qr9UrxR4v2qv1S3hj0+NIDaQAAAAAAADKnmjWHQOfo541h0DG1PMAYUAAAAAAAAAAAAAAFHi/aq/VK8UeL9qr9Ut4Y9PjSA2kAAAAAAAAyo541h0AMbU8wBhQAAAAAAAAAAAAAAUeL9qr9Ug3hj0+NIDaQAAAD/9k='
                  }
                  className={style.image}
                ></img>
                <span className={style.util_list} onClick={onClick}>
                  로그아웃
                </span>
              </>
            ) : (
              <>
                <Link to="/login" className={style.util_list}>
                  로그인
                </Link>
                <Link to="/signup" className={style.util_list}>
                  회원가입
                </Link>
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
      </div>
    </header>
  );
}
