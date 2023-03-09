import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../recoil/userInfo';
import { logIn } from '../../api/authApi';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Section = styled.div`
  margin: auto;
  height: 80%;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 7rem 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 3rem 0;
  width: 25rem;
  border: solid 1px var(--color-black2);
`;

const H3 = styled.h3`
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-black2);
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: auto;
  height: 6rem;
  width: 80%;
  border: solid 1px var(--color-gray2);
  position: relative;
`;

const Input = styled.input`
  height: 5rem;
  padding-left: 0.5rem;
  border: none;
  background: transparent;
  &:first-child {
    border-bottom: solid 1px var(--color-gray2);
  }
`;

const Errors = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
  font-size: 12px;
  color: var(--color-brown);
`;

const Btn = styled.input`
  height: 3rem;
  width: 20rem;
  margin: auto;
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 500;
  border: none;
  background-color: var(--color-black2);
`;

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
    <Section>
      <Container>
        <Link to="/">
          <H3 className="fah">LOG IN</H3>
        </Link>

        <Form onSubmit={handleSubmit(onValid)}>
          <InputContainer>
            <Input
              {...register('email', {
                required: 'Enter your email',
              })}
              type="text"
              placeholder="email"
              value="admin@admin.com"
            />
            <Input
              {...register('password', {
                required: 'Enter your password',
              })}
              placeholder="password"
              type="password"
              value="adminadmin"
            />
          </InputContainer>

          <Errors>
            {errors && <small role="alert">{errors.email?.message}</small>}
            {errors && <small role="alert">{errors.password?.message}</small>}
          </Errors>

          <Btn type="submit" value="LOGIN" />
        </Form>

        <div>
          Don't have an account ? <Link to="/signup">Sign up</Link>
        </div>
      </Container>
    </Section>
  );
};

export default LogIn;
