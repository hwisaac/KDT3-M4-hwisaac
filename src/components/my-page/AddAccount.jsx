import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { addAccount, getAvailableBank } from '../../api/accountApi';
import { getCookie } from '../../recoil/userInfo';
import LoadingModal from '../ui/loading/LoadingModal';
import styled from 'styled-components';

export const AddAccount = () => {
  const [bankDigits, setBankDigits] = useState(0); // 입력해야할 계좌번호 자리수
  const accessToken = getCookie('accessToken');
  const navigate = useNavigate();

  const { isLoading, data: banks } = useQuery(['availableBanks'], () => getAvailableBank({ accessToken }));
  const connectNewAccount = useMutation(({ accessToken, inputData }) => addAccount({ accessToken, inputData }), {
    onSuccess: () => {
      alert('계좌가 성공적으로 연결되었습니다.');
      navigate('/mypage/myaccount');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * 계좌추가 가능한 은행중 하나를 선택하면 그 은행의 계좌번호가 몇자리수인지 계산하여 저장
   * @param {*} event
   */
  const selectBank = (event) => {
    const selectedBank = banks.filter((bank) => bank.code === event.target.value);
    setBankDigits(selectedBank[0].digits.reduce((a, b) => a + b, 0));
  };

  const onValid = (inputData) => {
    connectNewAccount.mutate({ accessToken, inputData });
  };

  if (isLoading) return <LoadingModal />;
  return (
    <Wrapper>
      <Modal>
        <ModalHeader>
          <H5>Add my account</H5>
          <Link to="/mypage/myaccount">
            <AiFillCloseCircle size={25} />
          </Link>
        </ModalHeader>
        <ModalBody onSubmit={handleSubmit(onValid)}>
          <FormWrapper>
            <FormDiv>
              BANK
              <SelectBox>
                <select
                  {...register('bankCode', { required: 'Choose the bank you want to connect to.' })}
                  type="text"
                  onChange={selectBank}
                >
                  <option value="">===BANK===</option>
                  {banks.map((bank) => (
                    <option value={bank.code} key={bank.code}>
                      {bank.name}({bank.code})
                    </option>
                  ))}
                </select>
              </SelectBox>
              <Errors>{errors?.bankCode?.message}</Errors>
            </FormDiv>
            <FormDiv>
              ACCOUNT NUMBER
              <Input
                {...register('accountNumber', {
                  required: 'This field is required.',
                  pattern: {
                    value: new RegExp(`^[0-9]{${bankDigits}}$`),
                    message: `Enter your ${bankDigits} digits of account number without '-'`,
                  },
                })}
                type="text"
                placeholder={`Enter your ${bankDigits} digits of account number without '-'`}
              />
              <Errors>{errors?.accountNumber?.message}</Errors>
            </FormDiv>
            <FormDiv>
              PHONE NUMBER
              <Input
                {...register('phoneNumber', {
                  required: 'This field is required.',
                  pattern: { value: /^[0-9]{11}$/, message: 'Check your phone number.' },
                })}
                type="text"
                placeholder="01012345678"
              />
              <Errors>{errors?.phoneNumber?.message}</Errors>
            </FormDiv>
            <FormDiv>
              <CheckBox>
                <input
                  {...register('signature', { required: 'Please check this box.' })}
                  type="checkbox"
                  id="signature"
                />
                <label for="signature">Checked all of the above, and be sure to add my account.</label>
              </CheckBox>

              <Errors>{errors?.signature?.message}</Errors>
            </FormDiv>
          </FormWrapper>
          <ModalFooter>
            <BigBtn type="submit" value="Connect this account"></BigBtn>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
};

export default AddAccount;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const Modal = styled.div`
  width: 25vw;
  background-color: var(--color-white);
  padding: 3rem 2rem 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1001;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  align-items: center;
  margin-bottom: 20px;
`;

const H5 = styled.h5`
  padding: auto;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-black2);
  width: 100%;
`;

const ModalBody = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.ul`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-sizing: content-box;
`;

const FormDiv = styled.li`
  width: 100%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Input = styled.input.attrs({
  placeholderTextColor: '#303631 ',
})`
  width: 80%;
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid #303631;
  background-color: transparent;
  font-size: 13px;
`;

const Errors = styled.div`
  font-size: 12px;
  color: var(--color-brown);
`;

const SelectBox = styled.div`
  width: 90%;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const BigBtn = styled.input`
  width: 50%;
  height: 3rem;
  text-align: center;
  box-sizing: border-box;
  padding: 0.5rem;
  color: var(--color-black2);
  background-color: var(--color-white2);
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    color: var(--color-white);
    background-color: var(--color-black2);
    transition: all 0.5s;
  }
`;
