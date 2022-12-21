import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_URL, HEADERS_USER } from '../../data/API';
import style from './MyOrder.module.css';

function MyOrder({ accessToken }) {
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    const getOrderList = async () => {
      let json;
      try {
        const res = await fetch(`${API_URL}products/transactions/details`, {
          method: 'GET',
          headers: { ...HEADERS_USER, Authorization: accessToken },
        });
        json = await res.json();
        const exceptDelivery = json.filter((order) => order.product.title !== '배송비');
        setMyOrder([...exceptDelivery]);
      } catch {
        console.log(json);
      }
    };
    getOrderList();
  }, []);

  const handleClick = async (event) => {
    const menu = event.target.name;
    const detailId = event.target.dataset.id;
    if (menu === '확정') {
      const res = await fetch(`${API_URL}products/ok`, {
        method: 'POST',
        headers: { ...HEADERS_USER, Authorization: accessToken },
        body: JSON.stringify({ detailId }),
      });
      return;
    } else if (menu === '취소') {
      const res = await fetch(`${API_URL}products/cancel`, {
        method: 'POST',
        headers: { ...HEADERS_USER, Authorization: accessToken },
        body: JSON.stringify({ detailId }),
      });
      return;
      // } else {
    }
  };
  console.log(myOrder);
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
              <div className={style.right}>
                {!order.done && !order.isCanceled ? (
                  <>
                    <button className={style.button} onClick={handleClick} name="확정" data-id={order.detailId}>
                      구매확정
                    </button>
                    <button className={style.button} onClick={handleClick} name="취소" data-id={order.detailId}>
                      구매취소
                    </button>
                    <button className={style.button} onClick={handleClick} name="상세" data-id={order.detailId}>
                      상세정보
                    </button>
                  </>
                ) : (
                  <button className={style.button} onClick={handleClick} name="상세" data-id={order.detailId}>
                    상세정보
                  </button>
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
