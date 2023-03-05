import ProductCard from '../../components/admin/ProductCard';
import style from './ProductManagement.module.css';
import { Link, Outlet } from 'react-router-dom';
import { getProducts, deleteSelectedProducts } from '../../api/productApi';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import { useSetRecoilState } from 'recoil';
import { myAtom } from '../../recoil/atoms';
import ConfirmModal from '../../components/ui/ConfirmModal';
import styled from 'styled-components';

const ProductManagement = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [answer, setAnswer] = useState(false);

  const { isLoading: gettingProducts, data: products, refetch } = useQuery(['products'], getProducts);
  const setterFn = useSetRecoilState(myAtom);
  useEffect(() => {
    setterFn({
      myFn: () => {
        console.log('refetching');
        refetch();
      },
    });
  }, []);

  // 체크리스트
  const [checkList, setCheckList] = useState({});
  const assignCheckList = (id, isChecked) => {
    const newObj = {};
    newObj[id] = isChecked;
    setCheckList((prev) => Object.assign(prev, newObj));
  };

  const removeSelectedProducts = useMutation((checkList) => deleteSelectedProducts(checkList), {
    // 성공하면 refetch 실행
    onSuccess: refetch,
  });

  /**
   * 선택삭제를 누르면 확인창을 띄운다
   */
  const handleSelectDelete = (event) => {
    // console.log(checkList);
    setOpenConfirmModal(true);
  };
  /** 확인창에서 answer = true 가 세팅되면 체크된 제품의 삭제를 진행한다 */
  useEffect(() => {
    if (answer) {
      // confirm
      removeSelectedProducts.mutate(checkList);
    }
  }, [answer]);

  return (
    <ProductList>
      {openConfirmModal ? (
        <ConfirmModal
          title={'선택삭제'}
          question={'선택된 요소를 삭제하시겠습니까?'}
          setOpenModal={setOpenConfirmModal}
          setAnswer={setAnswer}
        />
      ) : null}
      {removeSelectedProducts.isLoading ? <LoadingModal /> : null}
      <li className={style.listHeader}>
        <div>
          <input
            type="checkbox"
            className={style.selectAll}
            checked={selectAll}
            onChange={() => setSelectAll((prev) => !prev)}
          />
          <InterfaceMenu onClick={handleSelectDelete}>선택삭제</InterfaceMenu>
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
          const { id, title, price, description, tags, isSoldOut, thumbnail, isC } = product;
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
              selectAll={selectAll}
              assignCheckList={assignCheckList}
              checkList={checkList}
              isC={isC}
            />
          );
        })
      )}
    </ProductList>
  );
};

export default ProductManagement;

const ProductList = styled.ul`
  border-radius: 30px;
  border: 1px solid #ccc;
  padding: 30px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  .listHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    div span {
      margin-right: 15px;
    }

    .btn {
      border: none;
      width: 50px;
      height: 30px;
      border-radius: 10px;
      background-color: #2196f3;
      color: white;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: #0e436c;
      }
    }
  }
`;

const SelectAllInput = styled.input`
  margin-right: 30px;
`;
const InterfaceMenu = styled.span`
  cursor: pointer;
`;
