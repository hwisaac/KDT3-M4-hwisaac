import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { getOrderDetail, handleOrder } from '../../api/productApi';
import LoadingModal from '../ui/loading/LoadingModal';
import styled from 'styled-components';

export const TransactionDetail = () => {
  const location = useLocation();
  const detailId = location.state.detailId;
  const accessToken = location.state.accessToken;
  const refetch = location.state.refetch;

  const orderButton = ['구매확정', '구매취소'];
  const handleClick = async (event) => {
    const button = event.target.innerText;
    const detailId = event.target.dataset.id;
    await handleOrder({ button, accessToken, detailId });
    refetch();
  };

  const { isLoading, data: orderDetail } = useQuery(['myOrder', `${detailId}`], () =>
    getOrderDetail({ accessToken, detailId }),
  );

  if (isLoading) return <LoadingModal />;

  return (
    <Wrapper>
      <Modal>
        <ModalHeader>
          <H5>Order Details</H5>
          <Link to="/mypage/myorder">
            <AiFillCloseCircle size={25} />
          </Link>
        </ModalHeader>
        <ModalBody>
          <Table>
            <li>Order ID</li>
            <li>{detailId}</li>
            <li>Date</li>
            <li>{new Date(orderDetail.timePaid).toLocaleString('en-GB', { timeZone: 'UTC' })}</li>
            <li>Status</li>
            <li>{orderDetail.done ? '구매확정' : orderDetail.isCanceled ? '구매취소' : '미확정'}</li>
            <li>Product</li>
            <li>{orderDetail.product?.title}</li>
            <li>Price</li>
            <li>₩ {orderDetail.product?.price.toLocaleString()}</li>
            <li>Payment account</li>
            {orderDetail.account?.bankName} {orderDetail.account.accountNumber}
          </Table>
        </ModalBody>

        <Btns>
          {!orderDetail.done && !orderDetail.isCanceled
            ? orderButton.map((button) => (
                <Btn key={orderDetail.detailId + button} onClick={handleClick} data-id={detailId}>
                  {button}
                </Btn>
              ))
            : ''}
        </Btns>
      </Modal>
    </Wrapper>
  );
};
export default TransactionDetail;

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
  width: 30vw;
  background-color: var(--color-white);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  position: fixed;
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

const ModalBody = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const Table = styled.ul`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 2fr;
  margin: 0.3rem 0;
  color: var(--color-black1);
  font-size: 0.8rem;
  font-weight: 300;
  gap: 1rem;
  & :nth-child(odd) {
    font-weight: 600;
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 1rem;
`;

const Btn = styled.button`
  width: 50%;
  height: 3rem;
  text-align: center;
  box-sizing: border-box;
  padding: 0.5rem;
  border: 1px solid var(--color-black2);
  color: var(--color-black2);
  cursor: pointer;
  font-size: 12px;
  &:hover {
    color: var(--color-white);
    background-color: var(--color-black2);
    transition: all 0.5s;
  }
`;
