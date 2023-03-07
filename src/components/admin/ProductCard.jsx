import React from 'react';
// import style from './ProductCard.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../api/productApi';
import { MdHideImage, MdOutlineEdit } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myAtom } from '../../recoil/atoms';
import LoadingModal from '../ui/loading/LoadingModal';
import styled from 'styled-components';
import { formatPrice } from 'utils/util';
import { MdOutlineClear } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

const ProductCard = ({
  index,
  id,
  title,
  price,
  description,
  tags,
  isSoldOut,
  thumbnail,
  assignCheckList,
  checkList,
  selectAll,
  isC,
}) => {
  const navgiate = useNavigate();
  const atom = useRecoilValue(myAtom);
  const removeProduct = useMutation((id) => deleteProduct(id), {
    // 성공하면 닫고 데이터 refetch
    onSuccess: () => {
      atom.myFn(); // refetch 함수
    },
  });
  const handleChange = (event) => {
    setChecked((prev) => !prev);
    assignCheckList(id, event.currentTarget.checked);
  };
  // // 카드의 체크여부
  const [checked, setChecked] = useState(false);

  // // 전체박스 체크유무에 의존한 체킹
  useEffect(() => {
    setChecked(selectAll);
    assignCheckList(id, selectAll);
  }, [selectAll]);
  // // index, 사진, id, title, tags , 수정버튼, 삭제버튼
  return (
    <Card>
      <CheckboxContainer>
        <CustomCheckbox type="checkbox" onChange={handleChange} checked={checked} />
      </CheckboxContainer>
      <ImageContainer onClick={() => navgiate(`/products/${id}`)}>
        <img src={thumbnail} alt={title} />
      </ImageContainer>
      <Product isSoldOut={isSoldOut}>
        <Text>{title}</Text>
        <Text>{formatPrice(price)}</Text>
        <Tags>
          {tags.map((tag) => (
            <span>#{tag} </span>
          ))}
        </Tags>
      </Product>
      <DeleteBtn>
        <Link to={`edit/${id}`} state={{ index, id, title, price, description, tags, isSoldOut, thumbnail }}>
          <MdOutlineEdit />
        </Link>
        <MdOutlineClear onClick={() => removeProduct.mutate(id)} />
      </DeleteBtn>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  display: flex;
  padding: 0.5rem;
  -webkit-box-shadow: 0px 8px 26px -5px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 26px -5px rgba(0, 0, 0, 0.1);
  /* background-color: var(--color-brown); */
  transition: all 0.3s;
  &:hover {
    scale: 1.05;
  }
`;

const CheckboxContainer = styled.div`
  position: relative;
  text-align: left;
  font-size: 1rem;
  width: 5%;
`;

const CustomCheckbox = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  background-color: #deded3;
  margin: 0;
  &:checked {
    border-color: transparent;
    background-image: url('https://aromatica.co.kr/layout/basic/img/ico_checkbox.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--color-brown);
  }
`;

const ImageContainer = styled.div`
  cursor: pointer;
  width: 30%;
  margin-right: 1.5rem;
  margin-left: 1rem;
  border: 1px solid var(--color-white);
  img {
    width: 100%;
  }
  &:hover {
    border: 1px solid var(--color-gray2);
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 60%;
  vertical-align: top;
  padding-right: 0.5rem;
  opacity: ${(props) => (props.isSoldOut ? 0.5 : 1)};
  text-decoration: ${(props) => (props.isSoldOut ? 'line-through' : 'none')};
`;

const Text = styled.div`
  font-size: 0.8rem;
`;

const Tags = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  font-size: 0.75rem;
`;

const DeleteBtn = styled.div`
  width: 15%;
  align-self: flex-start;

  display: flex;
  gap: 5px;
  svg {
    cursor: pointer;
  }
`;
