import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BankIcon from './../ui/bank-icon/BankIcon';
import styled from 'styled-components';
import { BsPlusSquareFill, BsPlusSquare } from 'react-icons/bs';

const PaymentForm = ({ infos, productsPrice, onChange }) => {
  const [select, setSelect] = useState('');

  const onChangeInput = (balance, id, bankName) => {
    if (balance >= productsPrice + 3000) {
      onChange(id);
    } else {
      return alert('해당 계좌에 잔액이 부족하여 결제가 불가능합니다.');
    }
    setSelect(bankName);
  };

  return (
    <Wrap>
      {infos.accounts?.length === 0
        ? null
        : infos.accounts?.map((account) => (
            <Item key={account.id} select={select} bankName={account.bankName}>
              <label>
                <BankIcon bankCode={account.bankCode} scale="40%" />
                {/* {account.bankName} */}
                <input
                  type="radio"
                  name="account"
                  onChange={() => {
                    onChangeInput(account.balance, account.id, account.bankName);
                  }}
                />
                <span></span>
              </label>
            </Item>
          ))}
      <Item>
        <Link
          to={'/mypage'}
          onClick={() => {
            alert('계좌 추가 페이지로 이동합니다');
          }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <BsPlusSquare size={55} />
          {/* <BsPlusSquareFill size={55} /> */}
        </Link>
      </Item>
    </Wrap>
  );
};

const Wrap = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  position: relative;
  margin-right: 20px;
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    input {
      display: none;
    }
  }
  span {
    display: inline-block;
    width: 55px;
    height: 55px;
    position: absolute;
    z-index: -1;
    border: 3px solid ${({ select, bankName }) => (select === bankName ? '#303631' : 'transparent')};
    border-radius: 15%;
    box-sizing: border-box;
  }
`;

export default PaymentForm;
