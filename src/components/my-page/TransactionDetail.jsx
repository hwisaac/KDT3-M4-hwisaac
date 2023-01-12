import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { getOrderDetail } from '../../api/productApi';
import LoadingModal from '../ui/loading/LoadingModal';
import style from './TransactionDetail.module.css';

export const TransactionDetail = () => {
  const location = useLocation();
  const detailId = location.state.detailId;
  const accessToken = location.state.accessToken;

  const { isLoading, data: orderDetail } = useQuery(['myOrder', 'orderDetail'], () =>
    getOrderDetail({ accessToken, detailId }),
  );

  if (isLoading) return <LoadingModal />;

  return (
    <div className={style.wrapper}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <h2 className={style.headTitle}>결제상세정보</h2>
          <Link to="/mypage">
            <AiFillCloseCircle className={style.AiFillCloseCircle} />
          </Link>
        </div>
        <div className={style.modalBody}>
          <ul>
            <li>
              <span className={style.listName}>결제번호</span>
              {detailId}
            </li>
            <li>
              <span className={style.listName}>결제일시</span>
              {new Date(orderDetail.timePaid).toLocaleString()}
            </li>
            <li>
              <span className={style.listName}>진행상태</span>
              {orderDetail.done ? '구매확정' : orderDetail.isCanceled ? '구매취소' : '미확정'}
            </li>
            <br />
            <li>
              <span className={style.listName}>상품정보</span>
              {orderDetail.product?.title}
            </li>
            <li>
              <span className={style.listName}>상품가격</span>
              {orderDetail.product?.price.toLocaleString()}원
            </li>

            <br />
            <li>
              <p className={style.listName}>결제정보</p>
              {orderDetail.account?.bankName} {orderDetail.account.accountNumber}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TransactionDetail;
