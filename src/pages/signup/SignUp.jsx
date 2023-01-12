import { useState } from 'react';
import style from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../recoil/userInfo';
import { signUp } from '../../api/authApi';
import { encodeImageFileAsURL } from '../../api/productApi';
import { useForm } from 'react-hook-form';

export const SignUp = () => {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const [profileImgBase64, setProfileImg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onImgChange = async (event) => {
    const res = await encodeImageFileAsURL(event.target.files, setProfileImg);
  };

  const onValid = async ({ email, password, displayName }) => {
    const { profileImg, accessToken } = await signUp({ email, password, displayName, profileImgBase64 });
    setIsLoggedIn(true);
    setUserInfo({
      email,
      displayName,
      profileImg,
    });
    document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24}; secure`;
    document.location.href = '/';
  };

  return (
    <section className={style.section}>
      <header className={style.header}>
        <h1 className={style.h1}>회원가입</h1>
      </header>
      <form className={style.form} onSubmit={handleSubmit(onValid)}>
        <div className={style.div}>
          이메일 *
          <input
            {...register('email', {
              required: '가입하실 이메일을 입력해주세요.',
              pattern: { value: new RegExp('[^ @]*@[^ @]*'), message: '이메일 양식이 맞지않습니다. ' },
            })}
            className={style.input}
          ></input>
          <small>{errors?.email?.message}</small>
        </div>

        <div className={style.div}>
          비밀번호 *
          <input
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
              minLength: { value: 8, message: '최소 8자이상 입력해 주세요.' },
            })}
            type="password"
            className={style.input}
          ></input>
          <small>{errors?.password?.message}</small>
        </div>

        <div className={style.div}>
          아이디 *
          <input
            {...register('displayName', {
              required: '사용자 이름을 입력해 주세요.',
              maxLength: { value: 20, message: '최대 20자까지만 입력가능합니다.' },
            })}
            type="text"
            className={style.input}
          ></input>
          <small>{errors?.displayName?.message}</small>
        </div>

        <div className={style.div}>
          프로필 이미지 업로드
          <label htmlFor="file" className={`${style.label} `}>
            파일찾기
          </label>
          {profileImgBase64 === '' ? (
            <div className={style.noPreview}>'선택된 파일 없음' </div>
          ) : (
            <img src={profileImgBase64} className={style.preview} />
          )}
          <input
            {...register('profileImg', {
              onChange: onImgChange,
              validate: (files) => {
                if (files[0]?.size > 1000000) {
                  return `1MB 이하여야 합니다.(현재:${(files[0]?.size / 1000000).toFixed(2)}MB)`;
                } else {
                  return true;
                }
              },
            })}
            id="file"
            type="file"
            className={style.hidden}
          />
        </div>

        <div className={style.div}>
          <input type="submit" value="가입하기" className={`${style.input} ${style.btn}`} />
        </div>
      </form>
    </section>
  );
};

export default SignUp;
