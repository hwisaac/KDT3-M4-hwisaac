import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { loginState, userInfoState } from '../data/LoginData';

export default function useCart() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userName = userInfo.user.displayName;
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', userName || ''], () => getCart(userName), {
    enabled: !!userName,
  });

  const addOrUpdateItem = useMutation((product) => addOrUpdateToCart(userName, product), {
    onSuccess: () => queryClient.invalidateQueries(['carts', userName]),
  });

  const removeItem = useMutation((productId) => removeFromCart(userName, productId), {
    onSuccess: () => queryClient.invalidateQueries(['carts', userName]),
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
