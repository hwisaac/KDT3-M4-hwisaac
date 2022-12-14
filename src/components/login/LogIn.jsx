import { useState } from 'react';
import { authUrl, HEADERS_USER } from '../../data/API';
import style from './LogIn.module.css';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../data/LoginData';
=======
import { login } from '../../api/firebase';
>>>>>>> a3b63b1452ba61deac4cd10551cbe0ec75ff1ca7

export function LogIn() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const setLoginState = useSetRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { email, password } = inputs;
  const onChange = (event) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   const res = await fetch(`${authUrl}/login`, {
  //     method: 'POST',
  //     headers: Headers,
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const json = await res.json();
  //   console.log(email, password);
  //   console.log('json:', json);
  //   const userName = json.user.displayName;
  //   const accessToken = json.accessToken;

  //   document.cookie = `user=${userName};  path=/; max-age=3600; secure`;
  //   document.cookie = `token=${accessToken}; path=/; max-age=3600; secure`;
  //   // console.log(document.cookie);
  //   // return json;
  // };
  const handleClick = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    try {
      const res = await fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: HEADERS_USER,
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      const {
        user: { displayName, profileImg },
        accessToken,
      } = json;
      console.log(json);
      setLoginState(true);
      setUserInfo({
        user: { email, displayName, profileImg },
        accessToken,
      });
      document.location.href = '/';
    } catch (error) {
      console.error(error.message);
    }
=======
    console.log(email, password);
    login(email, password);
>>>>>>> a3b63b1452ba61deac4cd10551cbe0ec75ff1ca7
  };
  return (
    <>
      <Link to="/" className={style.header}>
        <h1>NAVER</h1>
      </Link>
      {/* 나중에 홈으로 링크 */}

      <div className={style.formContainer}>
<<<<<<< HEAD
        <form onSubmit={onSubmit} className={style.form}>
=======
        <form onSubmit={handleClick} className={style.form}>
>>>>>>> a3b63b1452ba61deac4cd10551cbe0ec75ff1ca7
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
