import style from './LogIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../recoil/userInfo';
import { logIn } from '../../api/authApi';
import { useForm } from 'react-hook-form';

export const LogIn = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = async ({ email, password }) => {
    const { displayName, profileImg, accessToken } = await logIn({ email, password });
    setIsLoggedIn(true);
    setUserInfo({
      email,
      displayName,
      profileImg,
    });
    document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24}; secure`;
    navigate('/');
  };

  return (
    <section className={style.section}>
      <Link to="/" className={style.header}>
        <h1 className={style.h1}>로그인</h1>
      </Link>

      <div className={style.formContainer}>
        <form onSubmit={handleSubmit(onValid)} className={style.form}>
          <div className={style.inputContainer}>
            <input
              {...register('email', {
                required: '가입하신 이메일을 입력해 주세요.',
              })}
              type="text"
              className={style.input}
              placeholder="email"
            />
            <input
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
              })}
              className={style.input}
              placeholder="password"
              type="password"
            />
          </div>
          {errors && <small role="alert">{errors.email?.message}</small>}
          {errors && <small role="alert">{errors.password?.message}</small>}
          <input type="submit" value="로그인" className={`${style.input} ${style.btn}`} />
        </form>
      </div>
    </section>
  );
};

export default LogIn;
