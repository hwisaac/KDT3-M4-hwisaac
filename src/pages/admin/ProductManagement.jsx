import ProductCard from '../../components/admin/ProductCard';
import style from './ProductManagement.module.css';
import { Link, Outlet } from 'react-router-dom';
import { getProducts, deleteSelectedProducts } from '../../api/productApi';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import { useSetRecoilState } from 'recoil';
import { myAtom } from '../../api/atoms';
import ConfirmModal from '../../components/ui/ConfirmModal';

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

  // TODO: 상품목록 초기화 기능 나중에 구현
  // const handleResetProducts = () => {
  //   resetAllProducts();
  // };

  return (
    <ul className={style.productList}>
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
          <span className={style.interfaceMenu} onClick={handleSelectDelete}>
            선택삭제
          </span>
          {/* <span className={style.interfaceMenu} onClick={handleResetProducts}>
            상품리셋
          </span> */}
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
    </ul>
  );
};

export default ProductManagement;
