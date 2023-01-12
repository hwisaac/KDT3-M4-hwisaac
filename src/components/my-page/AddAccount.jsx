import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { addAccount, getAvailableBank } from '../../api/accountApi';
import { getCookie } from '../../recoil/userInfo';
import LoadingModal from '../ui/loading/LoadingModal';
import style from './AddAccount.module.css';

export const AddAccount = () => {
  const [bankDigits, setBankDigits] = useState(0); // 입력해야할 계좌번호 자리수
  const accessToken = getCookie('accessToken');
  const navigate = useNavigate();

  const { isLoading, data: banks } = useQuery(['availableBanks'], () => getAvailableBank({ accessToken }));
  const connectNewAccount = useMutation(({ accessToken, inputData }) => addAccount({ accessToken, inputData }), {
    onSuccess: () => {
      alert('계좌가 성공적으로 연결되었습니다.');
      navigate('/mypage');
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
    <div className={style.wrapper}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.headTitle}>계좌 연결하기</h2>
          <Link to="/mypage">
            <AiFillCloseCircle className={style.AiFillCloseCircle} />
          </Link>
        </div>
        <form className={style.modalBody} onSubmit={handleSubmit(onValid)}>
          <ul className={style.inputs}>
            <li>
              <span className={style.listName}>은행명</span>
              <select
                {...register('bankCode', { required: '연결할 은행을 선택해 주세요.' })}
                type="text"
                onChange={selectBank}
              >
                <option value="">===은행===</option>
                {banks.map((bank) => (
                  <option value={bank.code} key={bank.code}>
                    {bank.name}({bank.code})
                  </option>
                ))}
              </select>
              <span className={style.errorMessage}>{errors?.bankCode?.message}</span>
            </li>
            <li>
              <span className={style.listName}>계좌번호</span>
              <input
                {...register('accountNumber', {
                  required: '계좌번호를 입력해 주세요.',
                  pattern: { value: new RegExp(`^[0-9]{${bankDigits}}$`), message: '계좌번호를 확인해 주세요.' },
                })}
                type="text"
                placeholder={`'-'없이 계좌번호 ${bankDigits}자리를 입력해 주세요.`}
              />
              <span className={style.errorMessage}>{errors?.accountNumber?.message}</span>
            </li>
            <li>
              <span className={style.listName}>전화번호</span>
              <input
                {...register('phoneNumber', {
                  required: '전화번호를 입력해 주세요.',
                  pattern: { value: /^[0-9]{11}$/, message: '전화번호를 확인해 주세요.' },
                })}
                type="text"
                placeholder="01012345678"
              />
              <span className={style.errorMessage}>{errors?.phoneNumber?.message}</span>
            </li>
            <li>
              <input {...register('signature', { required: '위 내용을 확인 후 체크해 주세요.' })} type="checkbox" />위
              내용을 모두 확인하였으며, 해당 계좌를 연결하겠습니다.
              <span className={style.errorMessage}>{errors?.signature?.message}</span>
            </li>
          </ul>

          <div className={style.modalFooter}>
            <button type="submit" className={style.btn}>
              계좌 연결하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
