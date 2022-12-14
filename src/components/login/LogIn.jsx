import { useState } from 'react';
import { authUrl, Headers } from '../../data/API';
import style from './LogIn.module.css';
import { Link } from 'react-router-dom';
import { login } from '../../api/firebase';

export function LogIn() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
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
    console.log(email, password);
    login(email, password);
  };
  return (
    <>
      <Link to="/" className={style.header}>
        <h1>NAVER</h1>
      </Link>
      {/* 나중에 홈으로 링크 */}

      <div className={style.formContainer}>
        <form onSubmit={handleClick} className={style.form}>
          <div className={style.inputContainer}>
            {/* <div className={style.text}>이메일 로그인</div> */}
            <input className={style.input} name="email" type="text" value={email} onChange={onChange}></input>
            <input className={style.input} name="password" type="password" value={password} onChange={onChange}></input>
          </div>
          <input type="submit" value="로그인" className={`${style.input} ${style.btn}`} />
        </form>
      </div>
    </>
  );
}

export default LogIn;
