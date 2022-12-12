import { useState } from 'react';
import { authUrl, HEADERS_USER } from '../../data/API';
import style from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../data/LoginData';

function SignUp() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const setLoginState = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const [profileImgBase64, setProfileImg] = useState('');
  const { email, password, displayName } = inputs;
  const onChange = (event) => {
    const { value, name } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onImgChange = (event) => {
    const { files } = event.target;
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (e) => {
      const base64 = e.target.result;
      setProfileImg(base64);
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password, displayName, profileImgBase64);

    try {
      const res = await fetch(`${authUrl}/signup`, {
        method: 'POST',
        headers: HEADERS_USER,
        body: JSON.stringify({ email, password, displayName, profileImgBase64 }),
      });
      const json = await res.json();
      const {
        user: { profileImg },
        accessToken,
      } = json;
      setLoginState(true);
      setUserInfo({
        user: { email, displayName, profileImg },
        accessToken,
      });
      document.location.href = '/';
    } catch {
      console.log('error');
    }
  };

  return (
    <section className={style.signUpSection}>
      <Link to="/" className={style.header}>
        <h1>NAVER</h1>
      </Link>
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.div}>
          이메일
          <input
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            className={style.input}
            pattern="[^ @]*@[^ @]*"
            required
          ></input>
        </div>

        <div className={style.div}>
          비밀번호
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            className={style.input}
            minLength="8"
            required
          ></input>
        </div>

        <div className={style.div}>
          아이디
          <input
            name="displayName"
            type="text"
            value={displayName}
            onChange={onChange}
            className={style.input}
            maxLength="20"
            required
          ></input>
        </div>

        <div className={style.div}>
          프로필 이미지 업로드
          <input className={`upload-name ${style.file}`} value={profileImgBase64} disabled="disabled" />
          <label htmlFor="file" className={style.label}>
            파일찾기
          </label>
          <input id="file" name="profileImg" type="file" onChange={onImgChange} className={style.hidden} />
        </div>

        <div className={style.div}>
          <input type="submit" value="가입하기" className={`${style.input} ${style.btn}`} />
        </div>
      </form>
    </section>
  );
}

export default SignUp;
