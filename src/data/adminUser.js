export function adminUser(userInfo, setUserInfo) {
  const adminUser =
    userInfo.email === 'hyewon@gmail.com' ||
    userInfo.email === 'gorud0929@naver.com' ||
    userInfo.email === 'wh2ssac@naver.com' ||
    userInfo.email === 'hyein@naver.com' ||
    userInfo.email === 'jiwon@gmail.com'
      ? setUserInfo({ ...userInfo, isAdmin: true })
      : setUserInfo({ ...userInfo, isAdmin: false });
  return adminUser;
}
