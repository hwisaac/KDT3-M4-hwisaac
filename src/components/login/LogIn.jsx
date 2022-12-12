import { useState } from 'react';
import { authUrl, Headers } from '../../data/API';
import style from './LogIn.module.css';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../data/LoginData';

function LogIn() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const setLoginState = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const { email, password } = inputs;
  const onChange = (event) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: Headers,
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      const {
        user: { displayName, profileImg },
        accessToken,
      } = json;

      setLoginState(true);
      setUserInfo({
        user: { email, displayName, profileImg },
        accessToken,
      });
      document.cookie = `email=${email};  path=/; max-age=3600; secure`;
      document.cookie = `displayName=${displayName};  path=/; max-age=3600; secure`;
      document.cookie = `profileImg=${profileImg};  path=/; max-age=3600; secure`;
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; secure`;
      console.log(document.cookie);
      document.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Link to="/" className={style.header}>
        <h1>NAVER</h1>
      </Link>
      {/* 나중에 홈으로 링크 */}

      <div className={style.formContainer}>
        <form action="/" onSubmit={onSubmit} className={style.form}>
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
    </>
  );
}

export default LogIn;
