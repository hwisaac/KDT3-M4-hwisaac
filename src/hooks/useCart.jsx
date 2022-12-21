import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { loginState, userInfoState } from '../data/LoginData';
import { useNavigate } from 'react-router-dom';

export default function useCart() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userName = userInfo.displayName;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const cartQuery = useQuery(['carts', userName || ''], () => getCart(userName), {
    enabled: !!userName,
  });

  const addOrUpdateItem = useMutation((product) => addOrUpdateToCart(userName, product), {
    onSuccess: () => queryClient.invalidateQueries(['carts', userName]),
  });

  const removeItem = useMutation((productId) => removeFromCart(userName, productId), {
    onSuccess: () => queryClient.invalidateQueries(['carts', userName]),
  });

  const removeItems = useMutation((productIds) => removeFromCart(userName, productIds), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', userName]);
      navigate('/');
    },
  });
  return { cartQuery, addOrUpdateItem, removeItem, removeItems };
}
