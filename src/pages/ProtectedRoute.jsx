import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getCookie, loginState, userInfoState } from '../recoil/userInfo';

export default function ProtectedRoute({ children, requireAdmin }) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const accessToken = getCookie('accessToken');

  if (isLoggedIn && !accessToken) {
    setIsLoggedIn(false);
    setUserInfo({
      email: '',
      displayName: '',
      profileImg: '',
    });
    alert('토큰이 만료되어 로그인 페이지로 이동합니다.');
    return <Navigate to="/login" />;
  }
  if (!isLoggedIn || (requireAdmin && !userInfo.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
