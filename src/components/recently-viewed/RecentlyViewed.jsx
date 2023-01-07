import React from 'react';
import style from './RecentlyViewed.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { viewedListState } from '../../recoil/viewedListState';

const RecentlyViewed = () => {
  // const [scrollLocation, setScrollLocation] = useState(0);
  const viewedList = useRecoilValue(viewedListState)
  //중복된 상품 제거
  const products = viewedList.reduce((acc, current) => {
    const repeatedProduct = acc.find(product => product.id === current.id);
    if (!repeatedProduct) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  
  const viewedProducts = products.slice(0, 3)

  const navigate = useNavigate()
  const handleClick = (event) => {
    navigate(`/products/${event.target.className}`)
  }

  // const scroll = (event)=>{
  //   setScrollLocation(event.target.scrollTop)
  // }

  return (
    <section className={style.recentlyViewed}>
      <div className={style.title}>
        <h1>최근 본 상품</h1>
      </div>
      {viewedProducts.length === 0 ? (
        <div className={style.productsNone}>최근 본 상품이 없습니다</div>
      ) : (
        <div className={style.products}>
          {/* {viewedProducts.length === 4 ? (<button className={style.topBtn}>top</button>) : null} */}
          {viewedProducts.map((product) => {
            return (
              <div key={product.id} className={style.product}>
                <img src={product.photo} alt={product.title} className={product.id} onClick={handleClick}/>
                <p>{product.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RecentlyViewed;
