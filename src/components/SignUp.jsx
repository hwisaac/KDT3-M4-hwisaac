import { useState } from 'react';
import { authUrl, Headers } from '../data/authApi';
import styles from './SignUp.module.css';

function SignUp() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const { email, password, displayName } = inputs;
  const onChange = (event) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`${authUrl}/signup`, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({ email, password, displayName }),
    });
    const json = await res.json();
    console.log(inputs);
    console.log(json);
  };

  return (
    <>
      <header>
        <h1>NAVER</h1>
        {/* 나중에 홈으로 링크 */}
      </header>
      <form onSubmit={onSubmit}>
        <div>
          이메일
          <input name="email" type="text" value={email} onChange={onChange}></input>
        </div>

        <div>
          비밀번호
          <input name="password" type="text" value={password} onChange={onChange}></input>
        </div>

        <div>
          아이디
          <input name="displayName" type="text" value={displayName} onChange={onChange}></input>
        </div>

        <div>
          <input type="submit" value="가입하기" className={styles.btn} />
        </div>
      </form>
    </>
  );
}

export default SignUp;
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgxTGRmMjdGTUxLRG5tR0NCa2VwIiwiaWF0IjoxNjY5ODI2MjY1LCJleHAiOjE2Njk5MTI2NjUsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.HBo0etNmtOjLiGr6Uc-0wKwAJtAbC5aGIh74iYwy934'
