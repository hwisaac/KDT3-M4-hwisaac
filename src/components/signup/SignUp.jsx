import { useState } from 'react';
import { authUrl, Headers } from '../../data/API';
import style from './SignUp.module.css';
import { Link } from 'react-router-dom';

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
    <section className={style.signUpSection}>
      <Link to="/" className={style.header}>
        <h1>NAVER</h1>
        {/* 나중에 홈으로 링크 */}
      </Link>
      <form onSubmit={onSubmit} className={style.form}>
        <div className={style.div}>
          이메일
          <input name="email" type="text" value={email} onChange={onChange} className={style.input}></input>
        </div>

        <div className={style.div}>
          비밀번호
          <input name="password" type="text" value={password} onChange={onChange} className={style.input}></input>
        </div>

        <div className={style.div}>
          아이디
          <input name="displayName" type="text" value={displayName} onChange={onChange} className={style.input}></input>
        </div>

        <div className={style.div}>
          <input type="submit" value="가입하기" className={`${style.input} ${style.btn}`} />
        </div>
      </form>
    </section>
  );
}

export default SignUp;
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlgxTGRmMjdGTUxLRG5tR0NCa2VwIiwiaWF0IjoxNjY5ODI2MjY1LCJleHAiOjE2Njk5MTI2NjUsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.HBo0etNmtOjLiGr6Uc-0wKwAJtAbC5aGIh74iYwy934'
