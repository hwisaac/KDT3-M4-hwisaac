import ProductCard from '../../components/admin/ProductCard';
// import style from './ProductManagement.module.css';
import { Link, Outlet } from 'react-router-dom';
import { getProducts, deleteSelectedProducts } from '../../api/productApi';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import { useSetRecoilState } from 'recoil';
import { myAtom } from '../../recoil/atoms';
import ConfirmModal from '../../components/ui/ConfirmModal';
import styled from 'styled-components';
import ProductTableHeader from 'components/admin/ProdudctTableHeader';
import { AiOutlineDelete } from 'react-icons/ai';

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

  return (
    <ProductList>
      {openConfirmModal ? (
        <ConfirmModal
          title={'선택삭제'}
          question={'선택된 요소를 삭제하시겠습니까?'}
          onCancel={() => setOpenConfirmModal(false)}
          onConfirm={() => {
            console.log(checkList);
            alert('현재 전부 삭제는 막혀있습니다.');
          }}
          // onConfirm={() => removeSelectedProducts.mutate(checkList)}
        />
      ) : null}

      {removeSelectedProducts.isLoading ? <LoadingModal /> : null}

      <li className="listHeader">
        <div>
          <CheckboxContainer>
            <CustomCheckbox
              type="checkbox"
              id="title"
              checked={selectAll}
              onChange={() => setSelectAll((prev) => !prev)}
            />

            <AiOutlineDelete onClick={handleSelectDelete} size="20" />
          </CheckboxContainer>
        </div>

        <Link to="add">
          <button className="btn">Add</button>
        </Link>
        <Outlet />
      </li>
      <ProductsWrapper>
        {gettingProducts
          ? 'loading..'
          : products?.map((product, index) => {
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
            })}
      </ProductsWrapper>
    </ProductList>
  );
};

export default ProductManagement;

const ProductList = styled.div`
  /* border: 1px solid #ccc; */
  margin-bottom: 100px;
  padding: 30px;
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
      cursor: pointer;
      transition: 0.3s;
      /* &:hover { */
      /* background-color: #eee; */
      /* } */
    }
  }
`;

const SelectAllInput = styled.input`
  margin-right: 30px;
`;
const InterfaceMenu = styled.span`
  cursor: pointer;
  border: 1px solid blue;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    cursor: pointer;
  }
`;
const CustomCheckbox = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  background-color: var(--color-light-gray3);

  &:checked {
    border-color: transparent;
    background-image: url('https://aromatica.co.kr/layout/basic/img/ico_checkbox.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--color-brown);
  }
`;

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;
