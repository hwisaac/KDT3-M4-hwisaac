import ProductCard from './ProductCard';
import AddModal from './AddModal';
import style from './ProductManagement.module.css';
import { useLocation, useNavigate, useMatch, Link, Outlet } from 'react-router-dom';
import { getProducts } from '../../data/API';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingModal from '../loading/LoadingModal.jsx';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myAtom } from '../../data/atoms.js';

const ProductManagement = () => {
  const { isLoading: gettingProducts, data: products, refetch } = useQuery(['products'], getProducts);
  const setterFn = useSetRecoilState(myAtom);
  useEffect(() => {
    setterFn({
      myFn: () => {
        console.log('refetching..');
        refetch();
      },
    });
  }, []);
  const [checkList, setCheckList] = useState({});
  const assignCheckList = (id, isChecked) => {
    const newObj = {};
    newObj[id] = isChecked;
    setCheckList((prev) => Object.assign(prev, newObj));
  };
  const handleSelectDelete = (event) => {
    for (let key of Object.keys(checkList)) {
      if (checkList[key]) {
        console.log('key:', key);
        console.log('checkList[key]', checkList[key]);
      }
    }
  };

  return (
    <ul className={style.productList}>
      <li className={style.listHeader}>
        <div>
          <span>전체선택</span>
          <span onClick={handleSelectDelete}>선택삭제</span>
          <span>상품초기화</span>
        </div>

        <Link to="add">
          <button className={style.btn}>Add</button>
        </Link>
        <Outlet />
      </li>
      {gettingProducts ? (
        <LoadingModal />
      ) : (
        products.map((product, index) => {
          const { id, title, price, description, tags, isSoldOut, thumbnail } = product;
          return (
            <ProductCard
              key={`productCard-${id}`}
              id={id}
              index={index}
              title={title}
              price={price}
              description={description}
              tags={tags}
              isSoldOut={isSoldOut}
              thumbnail={thumbnail}
              assignCheckList={assignCheckList}
              checkList={checkList}
            />
          );
        })
      )}
    </ul>
  );
};

export default ProductManagement;
