import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import formatPrice from '../../util/formatPrice';

const Product = ({ grid, id, thumbnail, title, price, description, isSoldOut }) => {
  const navigate = useNavigate();
  const onClickItem = (e) => {
    if (e.target.nodeName !== 'BUTTON' && !isSoldOut) {
      navigate(`/products/${id}`, { state: { id, title, thumbnail, price } });
    }
  };

  return (
    <Wrap onClick={onClickItem} grid={grid}>
      <ImgArea grid={grid}>
        <img src={thumbnail} alt={title} />
      </ImgArea>
      <TextArea grid={grid}>
        <h2>{title}</h2>
        <p>{formatPrice(price)}</p>
        {grid === 'list' ? <span>{description}...</span> : null}
      </TextArea>
    </Wrap>
  );
};

const gridStyle = {
  list: {
    imgHeight: '200px',
    titleWidth: '',
  },
  image: {
    imgHeight: '200px',
    titleWidth: '210px',
  },
  bigImage: {
    imgHeight: '300px',
    titleWidth: '270px',
  },
  gallery: {
    imgHeight: '',
    titleWidth: '380px',
  },
};

const Wrap = styled.li`
  display: ${({ grid }) => (grid === 'list' ? 'flex' : 'block')};
  align-items: ${({ grid }) => (grid === 'list' ? 'center' : '')};
  padding: ${({ grid }) => (grid === 'list' ? '0 20px' : '')};
  cursor: pointer;
`;

const ImgArea = styled.div`
  height: ${({ grid }) => (grid ? gridStyle[grid].imgHeight : '200px')};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: ${({ grid }) => (grid === 'list' ? '30px' : '')};

  img {
    width: ${({ grid }) => (grid === 'list' ? '200px' : '100%')};
  }
`;

const TextArea = styled.div`
  margin-top: 20px;
  h2 {
    width: ${({ grid }) => (grid ? gridStyle[grid].titleWidth : '200px')};
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${({ grid }) => (grid === 'gallery' ? '25px' : '')};
  }
  p {
    font-size: 13px;
    line-height: 30px;
    font-size: ${({ grid }) => (grid === 'gallery' ? '15px' : '')};
  }
  span {
    display: block;
    font-size: 12px;
    margin-top: 30px;
  }
`;
export default Product;
