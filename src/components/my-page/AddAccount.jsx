import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ACCOUNT_URL, HEADERS_USER } from '../../api/commonApi';
import { getCookie } from '../../api/userInfo';
import style from './AddAccount.module.css';

function AddAccount() {
  const [banks, setBanks] = useState([]);
  const [bankDigits, setBankDigits] = useState(0);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    let json;
    const getAvailableBank = async () => {
      try {
        const res = await fetch(`${ACCOUNT_URL}/banks`, {
          method: 'GET',
          headers: { ...HEADERS_USER, Authorization: accessToken },
        });
        json = await res.json();
        let bankList = json;
        bankList = bankList.filter((bank) => !bank.disabled);
        setBanks([...bankList]);
      } catch {
        alert(json);
      }
    };
    getAvailableBank();
  }, [accessToken]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = async (data) => {
    let json;
    try {
      const res = await fetch(`${ACCOUNT_URL}`, {
        method: 'POST',
        headers: { ...HEADERS_USER, Authorization: accessToken },
        body: JSON.stringify(data),
      });
      json = await res.json();
      const { id } = json;
      console.log(id);
      alert('계좌가 성공적으로 연결되었습니다.');
      document.location.href = '/mypage';
    } catch {
      alert(json);
    }
  };

  const selectBank = (event) => {
    const selectedBank = banks.filter((bank) => bank.code === event.target.value);
    setBankDigits(selectedBank[0].digits.reduce((a, b) => a + b, 0));
  };

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
}

export default AddAccount;
