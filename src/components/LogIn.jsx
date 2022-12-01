import { useState } from 'react';
import { authUrl, Headers } from '../data/authApi';
import styles from './LogIn.module.css';

function LogIn() {
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
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`${authUrl}/login`, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    const userName = json.user.displayName;
    const accessToken = json.accessToken;
    console.log(userName, accessToken);
  };

  return (
    <>
      <header>
        <h1>NAVER</h1>
        {/* 나중에 홈으로 링크 */}
      </header>
      <div className={styles.formContainer}>
        <form action="/" onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            {/* <div className={styles.text}>이메일 로그인</div> */}
            <input name="email" type="text" value={email} onChange={onChange}></input>
            <input name="password" type="password" value={password} onChange={onChange}></input>
          </div>

          <input type="submit" value="로그인" className={styles.btn} />
        </form>
      </div>
    </>
  );
}

export default LogIn;
