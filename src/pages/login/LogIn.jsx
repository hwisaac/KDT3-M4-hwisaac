import { useState } from 'react';
import { authUrl, HEADERS_USER } from '../../api/commonApi';
import style from './LogIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../api/userInfo';

export function LogIn() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const setIsLoggedIn = useSetRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { email, password } = inputs;
  const onChange = (event) => {
    console.log(event.target);
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value.trim(),
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    let json;
    try {
      const res = await fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: HEADERS_USER,
        body: JSON.stringify({ email, password }),
      });
      json = await res.json();
      const {
        user: { displayName, profileImg },
        accessToken,
      } = json;
      setIsLoggedIn(true);
      setUserInfo({
        email,
        displayName,
        profileImg,
      });
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24}; secure`;
      navigate('/');
    } catch (error) {
      alert(json);
    }
  };
  return (
    <section className={style.section}>
      <Link to="/" className={style.header}>
        <h1 className={style.h1}>로그인</h1>
      </Link>

      <div className={style.formContainer}>
        <form onSubmit={onSubmit} className={style.form}>
          <div className={style.inputContainer}>
            {/* <div className={style.text}>이메일 로그인</div> */}
            <input
              className={style.input}
              name="email"
              placeholder="email"
              type="text"
              value={email}
              onChange={onChange}
              required
            ></input>
            <input
              className={style.input}
              name="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={onChange}
              required
            ></input>
          </div>
          <input type="submit" value="로그인" className={`${style.input} ${style.btn}`} />
        </form>
      </div>
    </section>
  );
}

export default LogIn;
