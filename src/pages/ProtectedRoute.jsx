import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '../data/LoginData';

export default function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  // const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 어드민 계정 설정 후, 어드민 권한이 있는지 확인하고 어드민 페이지 접근가능하도록 할것!
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
