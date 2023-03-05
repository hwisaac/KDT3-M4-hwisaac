import React, { useRef } from 'react';
import { alternativeImg } from '../../recoil/userInfo';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { BiLoader } from 'react-icons/bi';

import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { bank } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import BankIcon from '../ui/bank-icon/BankIcon';
import { editTransaction } from '../../api/productApi';
import styled from 'styled-components';

function TransactionCard({ payload }) {
  const {
    detailId,
    index = 0,
    done = true,
    isCanceled = true,
    timePaid = '',
    product,
    user,
    account,
    tableHeader,
    tableFooter,
  } = payload;
  const bankIcon = useRecoilValue(bank);
  const pendingBtn = useRef();
  const doneBtn = useRef();
  const canceledBtn = useRef();

  const { accountNumber, bankCode, bankName } = { ...account };
  const { description, price, productId, tags, thumbnail, title } = { ...product };
  const { displayName, email, profileImg } = { ...user };

  const toggleActive = (refBtn) => {
    const target = refBtn.current;
    if (target.classList.contains('active')) {
      target.classList.remove('active');
    } else {
      target.classList.add('active');
    }
  };
  const isActive = (refBtn) => {
    const target = refBtn.current;
    return target.classList.contains('active');
  };

  const onClickPending = () => {
    editTransaction(detailId, { done: false, isCanceled: false });
    toggleActive(pendingBtn);
    doneBtn.current.classList.remove('active');
    canceledBtn.current.classList.remove('active');
  };
  const onClickDone = () => {
    editTransaction(detailId, { done: !isActive(doneBtn), isCanceled: isActive(canceledBtn) });
    toggleActive(doneBtn);
    pendingBtn.current.classList.remove('active');
  };
  const onClickCanceled = () => {
    editTransaction(detailId, { done: isActive(doneBtn), isCanceled: !isActive(canceledBtn) });
    toggleActive(canceledBtn);
    pendingBtn.current.classList.remove('active');
  };
  // console.log(payload);

  // (user) email, displayName,
  // (product) title, thumbnail, price
  // (account) accountNumber, bankName
  // detailId, done, isCanceled

  return (
    <Card>
      <div className="select">
        <input type="checkbox" />
        {index}
      </div>
      <div className="user">
        <img className="profileImg" src={profileImg ? profileImg : alternativeImg} />
        <div>
          <span className="displayName">{displayName}</span>
          <span className="email">{email}</span>
        </div>
      </div>
      <div className="price">
        <span className={done ? 'done' : null}>₩ {price.toLocaleString()}</span>
      </div>
      <div className="product">
        <span className="title">
          {title}
          {detailId}
        </span>
      </div>
      <div className="status">
        <div
          name="pending"
          className={!(done || isCanceled) ? 'active' : null}
          onClick={onClickPending}
          ref={pendingBtn}
        >
          <BiLoader className="pending" />
          Pending
        </div>
        <div name="done" className={done && 'active'} onClick={onClickDone} ref={doneBtn}>
          <BsFillBagCheckFill className="complete" />
          Done
        </div>
        <div name="canceled" className={isCanceled ? 'active' : null} onClick={onClickCanceled} ref={canceledBtn}>
          <GiCancel className="cancel" />
          Canceled
        </div>
      </div>
      <div className="bank">
        <BankIcon bankCode={bankCode} scale={'25%'} className="bankIcon" />
        <BankIcon bankCode={bankCode} scale={'25%'} className="bankIcon" />
      </div>
      <div className="icons">
        <AiOutlineEdit className="edit" />
        <AiOutlineDelete className="delete" />
      </div>
    </Card>
  );
}

export default TransactionCard;

const Card = styled.li`
  display: grid;
  grid-template-columns: 30px 150px 90px auto 100px 50px 100px;
  gap: 15px;
  box-sizing: border-box;
  padding: 10px 15px;
  border: 2px solid var(--color-light-gray2);
  border-top: none;
  color: #32353d;
  .select {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user {
    gap: 10px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    .profileImg {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      border: 2px solid var(--color-blue);
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .displayName {
        font-size: 14px;
      }
      .email {
        font-size: 11px;
        font-weight: 400;
        color: gray;
      }
    }
  }
  .price {
    display: flex;
    align-items: center;
    span {
      background-color: var(--color-light-gray2);
      color: var(--color-dark-gray2);
      border-radius: 50px;
      padding: 3px 10px;
      font-size: 12px;
      font-weight: 500;
      &.done {
        background-color: var(--color-light-green);
        color: var(--color-dark-green);
      }
    }
  }
  .product {
    display: flex;
    align-items: center;
    font-size: 14px;
    overflow: hidden;
    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
  }
  .status {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
    & > div {
      display: flex;
      align-items: center;
      font-size: 10px;
      border-radius: 50px;
      padding: 3px 10px;
      color: var(--color-light-grey);
      border: 1px dashed var(--color-light-grey);
      gap: 5px;
      cursor: pointer;
      &:hover {
        background-color: var(--color-dark-gray2);
        color: var(--color-light-gray2);
        border: 1px solid var(--color-dark-gray2);
      }
    }
    .active {
      background-color: var(--color-light-gray2);
      color: var(--color-dark-gray2);
      border: 1px solid var(--color-dark-gray2);
    }
  }
  .bank {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 15px;
    justify-content: center;
    gap: 3px;
    position: relative;
    .bankName {
      display: flex;
      border: 1px solid red;
    }
    .accountNumber {
      color: var(--color-light-grey1);
      font-size: 12px;
      font-weight: 300;
    }
    .bankIcon:nth-child(1) {
      left: -40%;
      filter: blur(10px);
      -webkit-filter: blur(10px);
    }
    .bankIcon:nth-child(2) {
      left: -50%;
    }
  }
  .icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 20px;
    .delete,
    .edit {
      cursor: pointer;
      color: var(--color-dark-gray2);
    }
  }
`;
