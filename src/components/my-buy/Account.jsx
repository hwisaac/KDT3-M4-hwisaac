import React from 'react';
import style from './Account.module.css';

const Account = ({ id, bankName, balance, accountNumber, productsPrice, onChange }) => {
  const accountColor = {
    KB국민은행: 'kbBank',
    신한은행: 'shBank',
    우리은행: 'wrBank',
    하나은행: 'hnBank',
    케이뱅크: 'kBank',
    카카오뱅크: 'kkoBank',
    NH농협은행: 'nhBank',
  };

  const onChangeInput = () => {
    if (balance >= productsPrice + 3000) {
      onChange(id);
      console.log('작동');
    } else {
      return alert('해당 계좌에 잔액이 부족하여 결제가 불가능합니다.');
    }
  };

  return (
    <li key={id} className={style.accountInfo}>
      <label>
        <div className={`${style.account} ${style[accountColor[bankName]]}`}>
          <input type="radio" name="account" onChange={onChangeInput} />
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
