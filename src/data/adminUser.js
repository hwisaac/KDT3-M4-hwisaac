export function adminUser(userInfo, setUserInfo) {
  const adminUser =
    userInfo.email === 'hyewon@gmail.com' || 'gorud0929@naver.com' || 'wh2ssac@naver.com'
      ? setUserInfo({ ...userInfo, isAdmin: true })
      : setUserInfo({ ...userInfo, isAdmin: false });
  return adminUser;
}
