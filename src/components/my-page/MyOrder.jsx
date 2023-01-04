import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_URL, HEADERS_USER } from '../../api/commonApi';
import style from './MyOrder.module.css';

function MyOrder({ accessToken }) {
  const [myOrder, setMyOrder] = useState([]);
  const sorted = [...myOrder].sort((a, b) => a.timePaid - b.timePaid);
  const [button, setButton] = useState([]);
  const orderButton = ['구매확정', '구매취소', '상세정보'];
  const Button = ({ order, orderButton, handleClick }) => {
    return (
      <button className={style.button} onClick={handleClick} name={orderButton} data-id={order.detailId}>
        {orderButton}
      </button>
    );
  };
  useEffect(() => {
    const getOrderList = async () => {
      let json;
      try {
        const res = await fetch(`${API_URL}products/transactions/details`, {
          method: 'GET',
          headers: { ...HEADERS_USER, Authorization: accessToken },
        });
        json = await res.json();
        let sorted = [...json].sort((a, b) => new Date(b.timePaid) - new Date(a.timePaid));
        const exceptDelivery = sorted.filter((order) => order.product.title !== '배송비');
        setMyOrder([...exceptDelivery]);
      } catch {
        console.log(json);
      }
    };
    getOrderList();
  }, [button]);

  const handleClick = async (event) => {
    const menu = event.target.name;
    const detailId = event.target.dataset.id;
    if (menu === '구매확정') {
      const res = await fetch(`${API_URL}products/ok`, {
        method: 'POST',
        headers: { ...HEADERS_USER, Authorization: accessToken },
        body: JSON.stringify({ detailId }),
      });
      setButton([...button, '확정']);
      return;
    } else if (menu === '구매취소') {
      const res = await fetch(`${API_URL}products/cancel`, {
        method: 'POST',
        headers: { ...HEADERS_USER, Authorization: accessToken },
        body: JSON.stringify({ detailId }),
      });
      setButton([...button, '취소']);
      return;
    } else {
      console.log('상세정보');
    }
  };

  return (
    <section className={style.myOrder}>
      <h2 className={style.h2}>주문내역</h2>
      <hr />
      {myOrder ? (
        myOrder.map((order) => (
          <>
            <div className={style.list} key={order.detailId}>
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
              <div className={style.right} key={order.detailId}>
                {!order.done && !order.isCanceled ? (
                  orderButton.map((button, index) => (
                    <Button key={order.detailId + index} order={order} orderButton={button} handleClick={handleClick} />
                  ))
                ) : (
                  <Button order={order} orderButton={orderButton[2]} handleClick={handleClick} />
                )}
              </div>
            </div>
            <hr />
          </>
        ))
      ) : (
        <span>구매내역이 없습니다.</span>
      )}
    </section>
  );
}

export default MyOrder;
