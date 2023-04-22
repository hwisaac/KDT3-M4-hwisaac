import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../../recoil/userInfo';
import { signUp } from '../../api/authApi';
import { encodeImageFileAsURL } from '../../api/productApi';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  height: 80%;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 7rem 1rem;
`;

const H3 = styled.h3`
  font-size: 2.5rem;
  font-weight: 800;
`;

const FormWrapper = styled.form`
  height: fit-content;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem 1rem;
  box-sizing: content-box;
`;

const FormDiv = styled.div`
  width: 80%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input.attrs({
  placeholderTextColor: '#303631 ',
})`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 1px solid #303631;
  background-color: transparent;
  font-size: 15px;
`;

const ErrorMessage = styled.small`
  font-size: 12px;
  color: var(--color-brown);
  margin-top: -5px;
`;

const Label = styled.label`
  cursor: pointer;
  display: block;
`;

const Hidden = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const BtnWrapper = styled.div`
  margin: 2rem;
`;

const Btn = styled.input`
  width: fit-content;
  color: var(--color-black2);
  font-size: 1rem;
  font-family: 'Fahkwang';
  font-weight: 700;
  border: NONE;
  padding: 1rem 4rem;
  border: 1px solid var(--color-gray1);
  cursor: pointer;
  &:hover {
    color: var(--color-white);
    background-color: var(--color-black2);
    transition: all 0.5s;
  }
`;

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
    <Section>
      <H3 className="fah">SIGN UP</H3>
      <FormWrapper onSubmit={handleSubmit(onValid)}>
        <FormDiv>
          E-MAIL *
          <Input
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: new RegExp('[^ @]*@[^ @]*'),
                message: 'Please enter an email address in the correct format',
              },
            })}
          ></Input>
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        </FormDiv>

        <FormDiv>
          USER NAME *
          <Input
            {...register('displayName', {
              required: 'This field is required',
              maxLength: { value: 20, message: 'Your username cannot be more than 20 characters long' },
            })}
            type="text"
          ></Input>
          <ErrorMessage>{errors?.displayName?.message}</ErrorMessage>
        </FormDiv>

        <FormDiv>
          PASSWORD *
          <Input
            {...register('password', {
              required: 'This field is required',
              minLength: { value: 8, message: 'Your password must be more than 8 characters long' },
            })}
            type="password"
          ></Input>
          <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        </FormDiv>

        <FormDiv>
          <Label htmlFor="file">FIND PROFILE IMAGE ↗</Label>
          {profileImgBase64 === '' ? '' : <img src={profileImgBase64} />}
          <Hidden
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
          />
        </FormDiv>

        <BtnWrapper>
          <Btn type="submit" value="GET STARTED" />
        </BtnWrapper>
      </FormWrapper>
    </Section>
  );
};

export default SignUp;
