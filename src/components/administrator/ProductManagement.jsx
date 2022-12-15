import ProductCard from './ProductCard';
import AddModal from './AddModal';
import style from './ProductManagement.module.css';
import { useLocation, useNavigate, useMatch, Link, Outlet } from 'react-router-dom';
import { getProducts } from '../../data/API';
import { useState, useEffect } from 'react';

const ProductManagement = () => {
  // const { products } = useLocation().state;
  const location = useLocation();
  const navigate = useNavigate();
  const addMatch = useMatch('/admin/products/add');
  // console.log('addMatch: ', addMatch);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const products = getProducts();
    products.then((data) => {
      setProducts(data);
    });
  }, []);

  // 모달창 노출 여부 state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const showModal = () => {
    navigate('add');
    // console.log('modal 창 오픈!');
    setAddModalOpen(true);
  };

  return (
    <ul className={style.productList}>
      <li className={style.listHeader}>
        <div>
          <span>전체선택</span>
          <span>선택삭제</span>
        </div>

        <Link to="add" state={{ background: location }}>
          <button className={style.btn}>Add</button>
        </Link>
        <Outlet />
      </li>
      {products.map((product, index) => {
        const { id, title, price, description, tags, isSoldOut, thumbnail } = product;
        return (
          <ProductCard
            key={`productCard-${id}`}
            index={index}
            title={title}
            price={price}
            description={description}
            tags={tags}
            isSoldOut={isSoldOut}
            thumbnail={thumbnail}
          />
        );
      })}
    </ul>
  );
};

export default ProductManagement;
