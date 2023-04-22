import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { getOrderList, handleOrder } from '../../api/productApi';
import LoadingModal from '../ui/loading/LoadingModal';
import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 1;
`;

const H3 = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-black1);
  width: 100%;
  margin-bottom: 2rem;
`;

const TableHead = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  place-items: center;
  margin: 0.2rem 0;
  color: var(--color-white);
  font-weight: 400;
`;

const TableRow = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  grid-row: auto;
  place-items: center;
  margin: 0.5rem 0;
  color: var(--color-white);
  font-weight: 300;
  font-size: 0.85rem;
  cursor: pointer;
`;

const HorizontalLine = styled.div`
  width: var(--width);
  height: 1px;
  opacity: 0.3;
  background-color: var(--color-white);
  margin: 1rem 0;
`;

const Nothing = styled.div`
  width: 100%;
  display: grid;
  padding: auto;
`;

export const MyOrder = () => {
  const { accessToken, myOrder } = useOutletContext();
  const navigate = useNavigate();

  // const { isLoading, data: myOrder, refetch } = useQuery(['myOrder'], () => getOrderList({ accessToken }));
  // if (isLoading) return <LoadingModal />;

  return (
    <Section>
      <Outlet />
      <H3 className="fah">MY ORDERS ({myOrder ? myOrder?.length : '0'})</H3>
      <TableHead>
        <li>PRODUCT</li>
        <li>PRICE</li>
        <li>DATE</li>
        <li>STATUS</li>
      </TableHead>
      <HorizontalLine />
      {myOrder ? (
        myOrder.map((order) => (
          <TableRow
            key={order.detailId}
            onClick={() => {
              const detailId = order.detailId;
              navigate(`transactions/${detailId}`, { state: { detailId, accessToken } });
            }}
          >
            <li>{order.product.title}</li>
            <li>{(order.product.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</li>
            <li> {new Date(order.timePaid).toLocaleString('en-GB', { timeZone: 'UTC' })}</li>
            <li>{order.done ? 'Confirmed' : order.isCanceled ? 'Cancelled' : `Pending`}</li>
          </TableRow>
        ))
      ) : (
        <Nothing>No order history.</Nothing>
      )}
    </Section>
  );
};

export default MyOrder;
