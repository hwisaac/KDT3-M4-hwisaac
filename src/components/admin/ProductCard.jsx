import React from 'react';
import style from './ProductCard.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../api/productApi';
import { MdHideImage } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myAtom } from '../../recoil/atoms';
import LoadingModal from '../ui/loading/LoadingModal';
import styled from 'styled-components';

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
  // 카드의 체크여부
  const [checked, setChecked] = useState(false);

  // 전체박스 체크유무에 의존한 체킹
  useEffect(() => {
    setChecked(selectAll);
    assignCheckList(id, selectAll);
  }, [selectAll]);
  // index, 사진, id, title, tags , 수정버튼, 삭제버튼
  return (
    <Item className={`${checked ? 'checked' : null}`}>
      {removeProduct.isLoading ? <LoadingModal /> : null}

      {isSoldOut ? <div className={`${style.soldOut}`}></div> : null}
      <div className="left">
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span className={style.index}>{index + 1}</span>
        {thumbnail ? (
          <img className={style.thumbnail} src={thumbnail} alt={title} />
        ) : (
          <MdHideImage className={style.noThumbnail} />
        )}
        <p className={style.title}>
          {title}
          <span className={style.id}>{id}</span>
        </p>
        <div className={style.tags}>
          {tags.map((tag) => (
            <span className={style.tag} key={`${id}-${tag}`}>{`#${tag}`}</span>
          ))}
        </div>
      </div>
      <div className="right">
        <Link to={`edit/${id}`} state={{ index, id, title, price, description, tags, isSoldOut, thumbnail }}>
          <button className={style.btn}>수정</button>
        </Link>
        <button className={style.btn} onClick={() => removeProduct.mutate(id)}>
          삭제
        </button>
      </div>
    </Item>
  );
};

export default ProductCard;

const Item = styled.li`
  display: flex;
  border-bottom: 1px solid #eee;
  align-items: center;
  justify-content: space-between;
  color: #666;
  position: relative;
  &.checked {
    background-color: beige;
  }
  .left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .right {
    margin-right: 10px;
  }
`;
