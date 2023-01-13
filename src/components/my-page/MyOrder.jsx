import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderList, handleOrder } from '../../api/productApi';
import LoadingModal from '../ui/loading/LoadingModal';
import style from './MyOrder.module.css';

export const MyOrder = ({ accessToken }) => {
  const navigate = useNavigate();
  const orderButton = ['구매확정', '구매취소', '상세정보'];

  const { isLoading, data: myOrder, refetch } = useQuery(['myOrder'], () => getOrderList({ accessToken }));
  if (isLoading) return <LoadingModal />;

  const Button = ({ order, orderButton, handleClick }) => {
    return (
      <button className={style.button} onClick={handleClick} name={orderButton} data-id={order.detailId}>
        {orderButton}
      </button>
    );
  };

  const handleClick = async (event) => {
    const menu = event.target.name;
    const detailId = event.target.dataset.id;
    if (menu === '상세정보') {
      navigate(`transactions/${detailId}`, { state: { detailId, accessToken } });
    } else {
      await handleOrder({ menu, accessToken, detailId });
      refetch();
    }
  };

  return (
    <section className={style.myOrder}>
      <h2 className={style.h2}>주문내역</h2>
      <hr />
      {myOrder ? (
        myOrder.map((order) => (
          <div key={order.detailId}>
            <div className={style.list}>
              <div className={style.left}>
                <img src={order.product.thumbnail} alt={order.product.title} className={style.img} />
                <div className={style.text}>
                  <li className={style.title}>{order.product.title}</li>
                  <li>
                    {order.product.price.toLocaleString()}원 | {new Date(order.timePaid).toLocaleString()}
                  </li>
                  <li className={style.description}>
                    {order.done
                      ? '구매확정 상태입니다. 확정 후에는 취소가 불가합니다.'
                      : order.isCanceled
                      ? '결제 취소'
                      : `배송완료 후 구매확정 버튼을 눌러주세요.`}
                  </li>
                </div>
              </div>
              <div className={style.right}>
                {!order.done && !order.isCanceled ? (
                  orderButton.map((button) => (
                    <Button
                      key={order.detailId + button}
                      order={order}
                      orderButton={button}
                      handleClick={handleClick}
                    />
                  ))
                ) : (
                  <Button order={order} orderButton={orderButton[2]} handleClick={handleClick} />
                )}
              </div>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <span>구매내역이 없습니다.</span>
      )}
    </section>
  );
};

export default MyOrder;
