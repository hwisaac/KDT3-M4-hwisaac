import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '../data/LoginData';

export default function ProtectedRoute({ children, requireAdmin }) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  if (!isLoggedIn || (requireAdmin && !userInfo.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
