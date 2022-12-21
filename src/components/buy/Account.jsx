import React from 'react';
import style from './Account.module.css';

const Account = ({ id, bankName, balance, accountNumber, productsPrice, onChange }) => {
  const accountColor = {
    KB국민은행: '#776C61',
    신한은행: '#2B40AB',
    우리은행: '#0199CA',
    하나은행: '#009693',
    케이뱅크: '#343E48',
    카카오뱅크: '#FDE100',
    NH농협은행: '#08B353',
  };

  return (
    <li key={id} className={style.accountInfo}>
      <label>
        <div className={style.account} style={{ backgroundColor: `${accountColor[bankName]}` }}>
          <input
            type="radio"
            name="account"
            onChange={() => {
              if (balance >= productsPrice + 3000) {
                onChange(id, bankName);
              } else {
                return alert('해당 계좌에 잔액이 부족하여 결제가 불가능합니다.');
              }
            }}
          />
          <div className={style.accountTxt}>
            <p>{bankName}</p>
            <p>계좌번호</p>
            <p>{accountNumber}</p>
          </div>
        </div>
      </label>
    </li>
  );
};

export default Account;
